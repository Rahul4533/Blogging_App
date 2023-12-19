import { useState, useRef, useEffect } from "react";

import { db } from "./firebaseinit";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

//Blogging App using Hooks
export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // async function getBlogs() {
    //     const citiesCol = collection(db, 'blogs');
    //     const citySnapshot = await getDocs(citiesCol);
    //     const blogs = citySnapshot.docs.map((doc) => {
    //         return{
    //         id: doc.id,
    //         ...doc.data()
    //         }

    //     });
    //      setBlogs(blogs)

    // }
    // getBlogs();
     onSnapshot(collection(db, "blogs"), (snapshort) => {
      const blogs = snapshort.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setBlogs(blogs);
    });

    
  }, []);

  //Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e) {
    e.preventDefault();
    //setBlogs([{title:formData.title,content:formData.content},...blogs]);
    console.log(blogs);
    titleRef.current.focus();

    await addDoc(collection(db, "blogs"), {
      title: formData.title,
      content: formData.content,
      createdon: new Date(),
    });
    setFormData({ title: "", content: "" });
  }

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length) {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blogs!!";
    }
  }, [blogs]);

  async function remove(i) {
    const docref = doc(db, "blogs", i);
   await deleteDoc(docref);
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              ref={titleRef}
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
              placeholder="Content of the Blog goes here.."
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs</h2>

      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-btn">
            <button className="btn remove" onClick={() => remove(blog.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
