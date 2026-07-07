const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const dayjs = require("dayjs");

async function generateReceipt(
    payment,
    application,
    settings
) {

    // =====================================
    // Receipt Folder
    // =====================================

    const receiptFolder = path.join(
        __dirname,
        "..",
        "uploads",
        "receipts"
    );

    if (!fs.existsSync(receiptFolder)) {

        fs.mkdirSync(receiptFolder, {
            recursive: true
        });

    }

    // =====================================
    // Receipt Number
    // =====================================

    const receiptNumber =
        payment.receiptNumber ||
        `SANVI-${dayjs().format("YYYY")}-${Date.now()}`;

    const fileName = `${receiptNumber}.pdf`;

    const filePath = path.join(
        receiptFolder,
        fileName
    );

    // =====================================
    // EJS Template
    // =====================================

    const templatePath = path.join(
        __dirname,
        "..",
        "views",
        "receipt.ejs"
    );
        // =====================================
    // Render HTML
    // =====================================

    const html = await ejs.renderFile(
        templatePath,
        {
            payment,
            application,
            settings,
            receiptNumber,
            generatedDate: dayjs().format(
                "DD MMM YYYY hh:mm A"
            )
        }
    );

    // =====================================
    // Launch Browser
    // =====================================

    const browser = await puppeteer.launch({

        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]

    });

    const page = await browser.newPage();

    // =====================================
    // Load HTML
    // =====================================

    await page.setContent(html, {

        waitUntil: "networkidle0"

    });

    // =====================================
    // PDF Settings
    // =====================================

    await page.pdf({

        path: filePath,

        format: "A4",

        printBackground: true,

        margin: {

            top: "15mm",

            right: "15mm",

            bottom: "15mm",

            left: "15mm"

        }

    });

    // Close Browser

    await browser.close();
        // =====================================
    // Return Receipt Details
    // =====================================

    return {

        receiptNumber,

        fileName,

        filePath

    };

}

// =====================================
// Export
// =====================================

module.exports = generateReceipt;