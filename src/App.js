import { memo, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  HiSun,
  HiMoon,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSave,
} from "react-icons/hi";
import { usePosts, PostProvider } from "./PostProvider";
import { HiCircleStack, HiRocketLaunch } from "react-icons/hi2";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  return (
    <section>
      <button
        onClick={() => setIsFakeDark(!isFakeDark)}
        className='btn-fake-dark-mode'
      >
        {isFakeDark ? <HiSun /> : <HiMoon />}
      </button>

      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  const { onClearPosts } = usePosts();
  return (
    <header>
      <h1>
        <span className='icon'>
          <HiCircleStack />
        </span>
        <span> TechJournal</span>
      </h1>
      <div className='mini-header'>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>
          <span>Delete All Articles</span>
          <span className='icon'>
            <HiOutlineTrash />
          </span>
        </button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder='Search Articles...'
    />
  );
}

function Results() {
  const { posts } = usePosts();
  return (
    <p>
      {" "}
      {posts.length} Articles Are Found{" "}
      <span>
        <HiRocketLaunch />
      </span>
    </p>
  );
}

const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Article Title'
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='Article Body'
      />
      <button className='btn-form'>
        <span>Add Article</span>
        <span className='icon'>
          <HiOutlineSave />
        </span>
      </button>
    </form>
  );
}

function List() {
  const { posts } = usePosts();
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  const { onAddPost } = usePosts();
  const [posts] = useState(() =>
    Array.from({ length: 100 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Article Archive</h2>
      <button onClick={() => setShowArchive(!showArchive)}>
        {showArchive ? "Hide Archive Articles" : "Show Archive Articles"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>
                <span>Add New Article</span>
                <span className='icon'>
                  <HiOutlinePencilAlt />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; Articles App by Ziad Moataz 2024</footer>;
}

export default App;
