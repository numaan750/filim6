// 'use client';
// import axios from 'axios';
// import { useRouter, useParams } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const page = () => {
//   const { id } = useParams();
//   const router = useRouter();

//   // Local state to hold the blog data and loading state
//   const [blogData, setBlogData] = useState({
//     title: '',
//     author: '',
//     content: '',
//     image: null, // Will hold the File object if a new image is uploaded
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch all blogs and then find the one with the matching id
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`
//         );
//         console.log(data, 'api response for blogs');

//         // Check if blogs array exists
//         if (data.success && data.blogs && data.blogs.length > 0) {
//           // Filter the blog with the matching id
//           const foundBlog = data.blogs.find((blog) => blog._id === id);
//           if (foundBlog) {
//             setBlogData({
//               title: foundBlog.title,
//               author: foundBlog.author,
//               content: foundBlog.content,
//               image: null, // We don't load the image file here
//             });
//           } else {
//             toast.error('Blog not found');
//           }
//         } else {
//           toast.error('No blogs available');
//         }
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         toast.error('Failed to load blog data');
//       }
//     };

//     if (id) {
//       fetchBlog();
//     }
//   }, [id]);

//   // Handle changes for text inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData({ ...blogData, [name]: value });
//   };

//   // Handle image file changes separately
//   const handleFileChange = (e) => {
//     setBlogData({ ...blogData, image: e.target.files[0] });
//   };

//   // Handle form submission and call the update API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       // Create a FormData object to send text and file data together
//       const formData = new FormData();
//       formData.append('title', blogData.title);
//       formData.append('author', blogData.author);
//       formData.append('content', blogData.content);

//       // Append the image file only if a new one has been selected
//       if (blogData.image) {
//         formData.append('image', blogData.image);
//       }

//       // Call your update API endpoint using axios.put
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/blogrouteupdate/${id}`,
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );

//       if (response.data.success) {
//         toast.success('Blog updated successfully!');

//       } else {
//         toast.error('Failed to update blog');
//       }
//     } catch (error) {
//       console.error('Error updating blog:', error);
//       toast.error('An error occurred while updating the blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='container mx-auto p-4'>
//       <h1 className='text-2xl font-bold mb-4'>Update Blog Post</h1>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label htmlFor='title' className='block font-medium mb-2'>
//             Title
//           </label>
//           <input
//             type='text'
//             name='title'
//             id='title'
//             value={blogData.title}
//             onChange={handleChange}
//             className='w-full border p-2 rounded'
//             required
//           />
//         </div>
//         <div className='mb-4'>
//           <label htmlFor='author' className='block font-medium mb-2'>
//             Author
//           </label>
//           <input
//             type='text'
//             name='author'
//             id='author'
//             value={blogData.author}
//             onChange={handleChange}
//             className='w-full border p-2 rounded'
//             required
//           />
//         </div>
//         <div className='mb-4'>
//           <label htmlFor='content' className='block font-medium mb-2'>
//             Content
//           </label>
//           <textarea
//             name='content'
//             id='content'
//             value={blogData.content}
//             onChange={handleChange}
//             className='w-full border p-2 rounded'
//             rows='5'
//             required
//           ></textarea>
//         </div>
//         <div className='mb-4'>
//           <label htmlFor='image' className='block font-medium mb-2'>
//             Image (optional)
//           </label>
//           <input
//             type='file'
//             name='image'
//             id='image'
//             onChange={handleFileChange}
//             className='w-full'
//           />
//         </div>
//         <button
//           type='submit'
//           className='bg-blue-600 text-white py-2 px-4 rounded'
//           disabled={loading}
//         >
//           {loading ? 'Updating...' : 'Update Blog'}
//         </button>
//       </form>
//       {/* Toast container for notifications */}
//       <ToastContainer position='top-right' autoClose={3000} />
//     </div>
//   );
// };

// export default page;

'use client';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const Page = () => {
  const { id } = useParams();

  // Separate state for main blog fields and the main image
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [mainImageUrl, setMainImageUrl] = useState(''); // URL from the blog document
  const [mainImageFile, setMainImageFile] = useState(null); // New file (if chosen)
  const [loading, setLoading] = useState(false);
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'], // Remove formatting
    ],
  };
  // Fetch all blogs and filter out the one with the matching id.
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`
        );
        console.log(data, 'api response for blogs');

        if (data.success && data.blogs && data.blogs.length > 0) {
          const foundBlog = data.blogs.find((blog) => blog._id === id);
          if (foundBlog) {
            setAlt(foundBlog.alt);
            setTitle(foundBlog.title);
            setAuthor(foundBlog.author);
            setContent(foundBlog.content);
            setMainImageUrl(foundBlog.image || '');
          } else {
            toast.error('Blog not found');
          }
        } else {
          toast.error('No blogs available');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Handle main image file change
  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
      // Optionally, show preview immediately
      setMainImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle form submission to update blog data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('alt', alt);

      // Append new main image file if one is selected; otherwise, the backend should keep the old one.
      if (mainImageFile) {
        formData.append('image', mainImageFile);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/blogrouteupdate/${id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.success) {
        toast.success('Blog updated successfully!');
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('An error occurred while updating the blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Update Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          {mainImageUrl && (
            <div className='mb-2'>
              <img src={mainImageUrl} alt='Main Blog' className='w-36' />
            </div>
          )}
          <input
            type='file'
            name='mainImage'
            id='mainImage'
            onChange={handleMainImageChange}
            className='w-full'
          />
        </div>
        {/* Title Input */}
        <div className='mb-4'>
          <label htmlFor='alt' className='block font-medium mb-2'>
            Text Alt
          </label>
          <input
            type='text'
            name='alt'
            id='alt'
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className='w-full border p-2 rounded'
            
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium mb-2'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>
        {/* Author Input */}
        <div className='mb-4'>
          <label htmlFor='author' className='block font-medium mb-2'>
            Author
          </label>
          <input
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>
        {/* Main Image Preview & Upload */}

        {/* Rich Text Editor for Content */}
        <div className='mb-4'>
          <label className='block font-medium mb-2'>Content</label>
          <ReactQuill
            ref={quillRef}
            theme='snow'
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder='Write something amazing...'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 cursor-pointer text-white py-2 px-4 rounded'
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  );
};

export default Page;
