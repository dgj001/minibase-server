const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Collection = require('../models/collectionModel');
const Database = require('../models/databaseModel');
const Document = require('../models/documentModel');
const Field = require('../models/fieldModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connection successful!');
}).catch(err => {
  console.log('DB connection failed!');
});

const encrypt = async (password) => {
  return bcrypt.hash(password, 10); //???
}

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    let users = [
      {
        email: 'dustinjohnson@fastmail.fm',
        password: 'asdfasdf'
      }
    ];

    let projects = [
      {
        name: 'office-supplies',
        databases: [
          {
            name: 'office-supplies',
            collections: [
              {
                name: 'items',
                documents: [
                  {
                    name: '00000001',
                    fields: [
                      { name: "Name", value: 'Hanging Organizer File Folders' },
                      { name: "Price", value: "$8.99" }
                    ]
                  },
                  {
                    name: '00000002',
                    fields: [
                      { name: "Name", value: 'Post-it Super Sticky Easel Pad' },
                      { name: "Price", value: "$52.90" }
                    ]
                  }
                ]
              },
              {
                name: 'customers',
                documents: [
                  {
                    name: '00000001',
                    fields: [
                      { name: "First Name", value: 'John' },
                      { name: "Last Name", value: "Doe" }
                    ]
                  },
                  {
                    name: '00000002',
                    fields: [
                      { name: "First Name", value: 'Jane' },
                      { name: "Last Name", value: "Doe" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'payroll',
        databases: [
          {
            name: 'payroll',
            collections: [
              {
                name: 'divisions',
                documents: [
                  {
                    name: '00000001',
                    fields: [
                      { name: "Name", value: 'Accounting' },
                    ]
                  },
                  {
                    name: '00000002',
                    fields: [
                      { name: "Name", value: 'Engineering' },
                    ]
                  }
                ]
              },
              {
                name: 'employees',
                documents: [
                  {
                    name: '00000001',
                    fields: [
                      { name: "First Name", value: 'Mary' },
                      { name: "Last Name", value: "Jones" }
                    ]
                  },
                  {
                    name: '00000002',
                    fields: [
                      { name: "First Name", value: 'Bob' },
                      { name: "Last Name", value: "Smith" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    // Replace password with has
    for (const user of users) {
      user._id = new mongoose.Types.ObjectId();
    }
    users = await User.create(users);

    if (users.length > 0) {
      for (const prj of projects) {
        prj._id = new mongoose.Types.ObjectId();
        prj.userId = users[0]._id
        const newProjects = await Project.create([prj]);

        for (const db of prj.databases) {
          db._id = new mongoose.Types.ObjectId();
          db.projectId = newProjects[0]._id
          const newDatabases = await Database.create([db]);

          for (const col of db.collections) {
            col._id = new mongoose.Types.ObjectId();
            col.databaseId = newDatabases[0]._id;
            col.createdAt = Date.now();
            const newCollections = await Collection.create([col]);

            for (const doc of col.documents) {
              doc._id = new mongoose.Types.ObjectId();
              doc.collectionId = newCollections[0]._id;
              doc.createdAt = Date.now();
              const newDocuments = await Document.create([doc]);

              for (const fld of doc.fields) {
                fld._id = new mongoose.Types.ObjectId();
                fld.documentId = newDocuments[0]._id;
                fld.createdAt = Date.now();
                await Field.create([fld]);
              }
            }
          }
        }
      }
    }

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Field.deleteMany();
    await Document.deleteMany();
    await Collection.deleteMany();
    await Database.deleteMany();
    await Project.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Nothing to do here. Specify an argument.');
  process.exit();
}

// console.log(process.argv);