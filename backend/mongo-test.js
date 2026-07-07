const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://sanviadmin:SanviBusinessConsultancy@sanvibusinesswebsite.cfqvzho.mongodb.net/?retryWrites=true&w=majority&appName=SanviBusinessWebsite";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "✅ Pinged your deployment. Successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);
  } finally {
    await client.close();
  }
}

run();