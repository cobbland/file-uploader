# File Uploader: Bigger than an email attachment

A file uploader, made as part of The Odin Project, following [these directions](https://www.theodinproject.com/lessons/nodejs-file-uploader). It uses Express, TKTK, et cetera.

## Needs

Stuff to use (and relearn).

- Web framework, routing, etc: Express
- Templating, views: EJS
- Database: PostgreSQL
- Database interaction: Prisma
- User authentication: Passport
- File storage: [supabase](https://supabase.com/)


## Steps

Putting it all together.

- [x] Set up a new project using Express and Prisma. Install all the necessary dependencies including Passport etc.
- [ ] Set up session based authentication using Passport.js. Use the Prisma session store library to persist sessions in the database.
- [ ] Add a form where authenticated users can upload a file. Save the file in your filesystem for now. You’ll need to integrate the multer middleware. We’ll upload these files once we have all other features working.
- [ ] Add folders. Users should be able to CRUD folders and upload files in them. Set up routes and necessary database interactions for this.
- [ ] Add a route to view specific file details like name, size, and upload time. There should be a download button to allow users to download the file.
- [ ] Finally, add logic to upload files. You could store it in a database, but it’s advised to use a cloud storage service for this usecase. You can use Cloudinary or Supabase storage. When a file is uploaded, save the file URL in the database.
- [ ] Validate your files! How you do this is up to you. You can limit certain file types to upload and/or restrict files that are too heavy.
- [ ] Extra credit
- [ ] Add a share folder functionality. When a user wants to share a folder (and all of its contents), they should have a form to specify the duration i.e. 1d, 10d etc. This should generate a link that can be shared with anyone (unauthenticated users). For example, the link could be in the following format: https://yourapp.com/share/c758c495-0705-44c6-8bab-6635fd12cf81