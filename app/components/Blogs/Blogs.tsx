import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '../SectionHeading/SectionHeading';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

// Define the shape of a blog post
interface BlogPost {
  _id: string;
  image: string;
  title: string;
  content: string;
  date: string; 
  author: string;
}

// Props for BlogCard component
interface BlogCardProps {
  image: string;
  title: string;
  content: string;
  date: string; 
  author: string;
}

// Helper function to format the date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

// BlogCard component to display individual blog posts
const BlogCard: React.FC<BlogCardProps> = ({ image, title, content, author, date }) => {
  const formattedDate = formatDate(date); // Format the date

  return (
    <div className='text-center bg-white mx-3 px-2 py-6 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer '>
      <Image
        src={image}
        alt='blog post image'
        width={200} 
        height={150} 
        className='mx-auto' 
      />
      <div className='flex text-[24px] mt-4 font-[600] text-[#02073e]'>
        <h1 className=''>{title}</h1>
      </div>
      <div className='flex mt-2 text-gray-600 text-[14px]'>
        <p className=''>{content}</p>
      </div>
      <div className='flex mt-5 text-gray-400 text-[14px] text-right justify-end'>
        <p className=''>{formattedDate}</p> {/* Display formatted date */}
      </div>
      <div className='flex mt-2 text-gray-400 text-[14px] text-right justify-end'>
        <p className=''>{author}</p>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]); // State to hold blog posts

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/blog');
      const data: BlogPost[] = await response.json();
      console.log("Fetched blog posts:", data);
      setPosts(data);
    };

    fetchPosts();
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='pt-[5rem] pb-[3rem]'>
      <SectionHeading
        headingMini="Latest Updates"
        headingPrimary="Explore Our Blog Posts"
      />
      <div className='pt-[5rem] w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-[1.4rem]'>
        {posts.map((post, index) => (
          <div 
            key={post._id}
            data-aos="zoom-in"
            data-aos-delay={index * 200} // Dynamic delay based on index
            data-aos-anchor-placement='top-center'
          >
            <BlogCard 
              image={post.image}
              title={post.title}
              content={post.content}
              date={post.date}
              author={post.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
