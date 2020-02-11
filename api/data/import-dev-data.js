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
            { email: 'dustinjohnson@fastmail.fm', password: 'asdfasdf' }
        ];

        let projects = [
            { name: 'shopping-cart' }
        ];

        let databases = [
            { name: 'database' }
        ];

        let collections = [
            { name: 'items' }
        ];

        let documents = [
            { name: 'Baseball bat' }
        ];

        let fields = [
            { name: 'Name', value: 'Baseball Bat' },
            { name: 'Price', value: '$29.99' }
        ];

        // Replace password with has
        for (const user of users) {
            user._id = new mongoose.Types.ObjectId();
        }
        users = await User.create(users);

        if (users.length > 0) {
            projects.forEach(prj => {
                prj._id = new mongoose.Types.ObjectId();
                prj.userId = users[0]._id
            });
            projects = await Project.create(projects);
        }

        if (projects.length > 0) {
            databases.forEach(db => {
                db._id = new mongoose.Types.ObjectId();
                db.projectId = projects[0]._id
            });
            databases = await Database.create(databases);
        }

        if (databases.length > 0) {
            collections.forEach(col => {
                col._id = new mongoose.Types.ObjectId();
                col.databaseId = databases[0]._id;
                col.createdAt = Date.now();
            });
            collections = await Collection.create(collections);
        }

        if (collections.length > 0) {
            documents.forEach(doc => {
                doc._id = new mongoose.Types.ObjectId();
                doc.collectionId = collections[0]._id;
                doc.createdAt = Date.now();
            });
            documents = await Document.create(documents);
        }

        if (documents.length > 0) {
            fields.forEach(fld => {
                fld._id = new mongoose.Types.ObjectId();
                fld.documentId = documents[0]._id;
                fld.createdAt = Date.now();
            });
            fields = await Field.create(fields);
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