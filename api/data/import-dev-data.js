const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Collection = require('../models/collectionModel');
const Database = require('../models/databaseModel');
const Document = require('../models/documentModel');
const Field = require('../models/fieldModel');
const Project = require('../models/projectModel');
const ProjectUser = require('../models/projectUserModel');
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
        ],
        projectUsers: [
          { email: 'bob.smith@example.com', password: 'setpass123' },
          { email: 'wanda_richardson@example.com', password: 'setpass123' },
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
        ],
        projectUsers: [
          { email: 'melinda.rogers@example.com', password: 'setpass123' },
          { email: 'william.hanover@example.com', password: 'setpass123' },
        ]
      }
    ];

    // Replace password with has
    users = await User.create(users);

    if (users.length > 0) {
      for (const prj of projects) {
        prj.userId = users[0]._id
        const newProjects = await Project.create([prj]);

        for (const db of prj.databases) {
          db.projectId = newProjects[0]._id;
          const newDatabases = await Database.create([db]);

          for (const col of db.collections) {
            col.databaseId = newDatabases[0]._id;
            const newCollections = await Collection.create([col]);

            for (const doc of col.documents) {
              doc.collectionId = newCollections[0]._id;
              const newDocuments = await Document.create([doc]);

              for (const fld of doc.fields) {
                fld.documentId = newDocuments[0]._id;
                await Field.create([fld]);
              }
            }
          }
        }

        for (const prjUser of prj.projectUsers) {
          prjUser._id = new mongoose.Types.ObjectId();
          prjUser.projectId = newProjects[0]._id;
          await ProjectUser.create(prjUser);
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
    await ProjectUser.deleteMany();
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