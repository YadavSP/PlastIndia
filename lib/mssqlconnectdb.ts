const sql = require('mssql')
export default async function connectToDatabase() {
    const config={
//server: "10.14.91.29",
    server: "10.52.208.180",
    database: "TRAVEL_REMB",
    user: "sa",
    password: "iocl@123",
    //driver: "msnodesqlv8",
    options: {
      encrypt: false, // Set to true if you are using a secure connection (HTTPS)
      trustedConnection: true, // Set to true if you are using Windows Authentication
      instancename:'SQLEXPRESS'

    },
    requestTimeout: 30000 // Set a longer timeout
   , port:1433
  
}

    try {
          await sql.connect(config);
        //console.log("Connected to the MS SQL database");
    } catch (error) {
      console.error("Connect to DB Error Error connecting to the database:", error);
    }
  }