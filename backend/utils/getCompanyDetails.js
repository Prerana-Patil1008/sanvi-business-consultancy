const Setting = require("../models/Setting");

const getCompanyDetails = async () => {

    const settings = await Setting.findOne();

    return {

        companyName:
            settings?.companyName ||
            "SANVI BUSINESS CONSULTANCY",

        tagline:
            settings?.tagline ||
            "",

        phone:
            settings?.phone ||
            "",

        email:
            settings?.email ||
            "",

        address:
            settings?.address ||
            "",

        website:
            settings?.website ||
            "",

        officeHours:
            settings?.officeHours ||
            "",

        logo:
            settings?.logo ||
            "",

    };

};

module.exports = getCompanyDetails;