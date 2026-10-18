const Listing = require("../models/Listing");

// @desc    Get all accommodation listings with multi-filter and search
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res, next) => {
  try {
    const {
      search,
      accommodationType,
      genderPreference,
      minRent,
      maxRent,
      maxDistance,
      occupancy,
      sector,
      amenities,
      foodIncluded,
      sort,
    } = req.query;

    const query = {};

    // 1. Text Search across Title, Sector, Address, Description
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { sector: searchRegex },
        { address: searchRegex },
        { description: searchRegex },
      ];
    }

    // 2. Accommodation Type (PG, Flat, Shared Room, etc.)
    if (accommodationType && accommodationType !== "All") {
      query.accommodationType = accommodationType;
    }

    // 3. Gender Preference
    if (genderPreference && genderPreference !== "All") {
      query.genderPreference = { $in: [genderPreference, "Any", "Co-ed"] };
    }

    // 4. Budget Range (Monthly Rent in INR)
    if (minRent || maxRent) {
      query.rent = {};
      if (minRent) query.rent.$gte = Number(minRent);
      if (maxRent) query.rent.$lte = Number(maxRent);
    }

    // 5. Distance from YMCA Faridabad (km)
    if (maxDistance && maxDistance !== "All") {
      query.distanceFromYMCA = { $lte: parseFloat(maxDistance) };
    }

    // 6. Occupancy / Room configuration
    if (occupancy && occupancy !== "All") {
      query.occupancy = occupancy;
    }

    // 7. Sector (Sector 6, Sector 7, Sector 11, etc.)
    if (sector && sector !== "All") {
      query.sector = new RegExp(sector, "i");
    }

    // 8. Food / Mess Included filter
    if (foodIncluded === "true" || foodIncluded === true) {
      query.foodIncluded = true;
    }

    // 9. Amenities Checklist
    if (amenities) {
      const amenitiesList = Array.isArray(amenities)
        ? amenities
        : amenities.split(",").map((a) => a.trim());
      if (amenitiesList.length > 0) {
        query.amenities = { $all: amenitiesList };
      }
    }

    // 10. Sorting
    let sortOption = { createdAt: -1 }; // Default: newest
    if (sort === "rent-asc") {
      sortOption = { rent: 1 };
    } else if (sort === "rent-desc") {
      sortOption = { rent: -1 };
    } else if (sort === "distance-asc") {
      sortOption = { distanceFromYMCA: 1 };
    } else if (sort === "rating-desc") {
      sortOption = { rating: -1 };
    }

    const listings = await Listing.find(query)
      .populate("owner", "name phone email avatar")
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single accommodation listing by ID
// @route   GET /api/listings/:id
// @access  Public
exports.getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("owner", "name phone email avatar role college")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name avatar college",
        },
      });

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new accommodation listing
// @route   POST /api/listings
// @access  Private (Owner / Student)
exports.createListing = async (req, res, next) => {
  try {
    const listingData = { ...req.body };
    listingData.owner = req.user.id;

    // Handle amenities if passed as JSON string or comma-separated
    if (typeof listingData.amenities === "string") {
      try {
        listingData.amenities = JSON.parse(listingData.amenities);
      } catch (e) {
        listingData.amenities = listingData.amenities.split(",").map((a) => a.trim());
      }
    }

    // Handle file upload via Cloudinary / Multer
    if (req.file) {
      listingData.images = [
        {
          url: req.file.path,
          filename: req.file.filename,
        },
      ];
    } else if (req.body.imageUrl) {
      listingData.images = [
        {
          url: req.body.imageUrl,
          filename: "manual_upload",
        },
      ];
    } else if (!listingData.images || listingData.images.length === 0) {
      // Default placeholder if none provided
      listingData.images = [
        {
          url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
          filename: "default_room",
        },
      ];
    }

    // Auto-calculate walking time if not provided (assume 12 mins per km)
    if (!listingData.walkingTimeToYMCA && listingData.distanceFromYMCA) {
      listingData.walkingTimeToYMCA = Math.round(listingData.distanceFromYMCA * 12);
    }

    const listing = await Listing.create(listingData);

    res.status(201).json({
      success: true,
      message: "Stay listed successfully!",
      listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (Owner of listing or Admin)
exports.updateListing = async (req, res, next) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // Check ownership
    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this listing",
      });
    }

    const updateData = { ...req.body };

    if (typeof updateData.amenities === "string") {
      try {
        updateData.amenities = JSON.parse(updateData.amenities);
      } catch (e) {
        updateData.amenities = updateData.amenities.split(",").map((a) => a.trim());
      }
    }

    if (req.file) {
      updateData.images = [
        {
          url: req.file.path,
          filename: req.file.filename,
        },
      ];
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner of listing or Admin)
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // Check ownership
    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this listing",
      });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Listing removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get listings created by currently logged in user
// @route   GET /api/listings/my/listings
// @access  Private
exports.getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ owner: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    next(error);
  }
};
