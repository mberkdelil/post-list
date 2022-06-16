import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPost(response.data))
      .catch(error => console.log(error))

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUser(response.data))
      .catch(error => console.log(error))

    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => setComments(response.data))
      .catch(error => console.log(error))

  }, []);

  const [id, setId] = useState(0);
  const [search, setSearch] = useState("")
  const [searchComment, setSearchComment] = useState("");

  const comment = comments.find(x => x.id === id ? x : null);

  const filterPost = post.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(search.toLocaleLowerCase()))
  })

  const filterComments = comments.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(searchComment.toLocaleLowerCase()))
  })

  return (
    <div>

      <div id="preloader">
        <div id="status">&nbsp;</div>
      </div>

      <header id="header">
        <div className="container">
          <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">

                <a className="navbar-brand" href="index.html"><span>REACT</span>JS</a> </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav custom_nav">
                  <li className=""><a href="index.html">Home</a></li>
                  <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Jobs</a>
                    <ul className="dropdown-menu" role="menu">
                      <li className="dropdown"> <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" href="#">Jobs Home</a> </li>
                      <li><a href="#">Faq</a></li>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">Article</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Features</a>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="#">Standard Blog Layout</a></li>
                      <li><a href="#">Post With Comments</a></li>
                      <li><a href="#">Page:Right Sidebar</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Shortcodes</a></li>
                  <li><a href="#">Archive</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Download Template</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <form id="searchForm">
            <input onChange={e => setSearch(e.target.value)} value={search} type="text" placeholder="Search For Post..." />
            <button type="button" className='btn btn-info'>Q</button>
          </form>
        </div>
      </header>

      {/* SOL */}

      <section id="contentbody">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-2 col-lg-2">
              <div className="row">
                <div className="middlebar_content">
                  <h2 className="yellow_bg">POST LIST</h2>

                  {/* POST MAP */}
                  {
                    filterPost.map(x => (
                      <div key={x.id} className="middlebar_content_inner wow fadeInUp">
                        <ul className="middlebar_nav">
                          <li onClick={() => setId(x.id)} > <a className="mbar_thubnail" href="#"><img src="https://jsonplaceholder.typicode.com/photos/1" alt="" /></a> <a style={{ color: "black" }} href="#">{x.title}</a> </li>
                        </ul>
                      </div>
                    ))
                  }

                  <div className="popular_categori  wow fadeInUp">
                    <h2 className="limeblue_bg">Most Popular Categories</h2>
                    <ul className="poplr_catgnva">
                      <li><a href="#">Business</a></li>
                      <li><a href="#">Gallery</a></li>
                      <li><a href="#">Life &amp; Style</a></li>
                      <li><a href="#">Games</a></li>
                      <li><a href="#">Slider</a></li>
                      <li><a href="#">Sports</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ORTA  */}

            <div className=" col-sm-12 col-md-6 col-lg-6">
              <div className="row">
                <div className="leftbar_content">
                  <h2>POST DETAIL</h2>

                  {/* COMMENTS MAP */}

                  <div key={comment?.id} className="single_stuff wow fadeInDown">
                    <div className="single_stuff_img"> <a href="pages/single.html"><img src="images/stuff_img1.jpg" alt="" /></a> </div>
                    <div className="single_stuff_article">
                      <div className="single_sarticle_inner"> <a className="stuff_category" href="#">Email: {comment?.email}</a>
                        <div className="stuff_article_inner"> <span className="stuff_date">ID <strong>{comment?.id}</strong></span>
                          <h2><a href="pages/single.html">Comment Author: {comment?.name}</a></h2>
                          <p>{comment?.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div className="col-sm-6 col-md-4 col-lg-4">
              <div className="row">
                <div className="rightbar_content">
                  <div className="single_blog_sidebar wow fadeInUp">
                    <h2>COMMENTERS</h2>
                    <form id="searchForm">
                      <input onChange={e => setSearchComment(e.target.value)} value={searchComment} type="text" placeholder="Search For Commenters" />
                      <button type="button" className='btn btn-info'>Q</button>
                    </form>
                    {
                      filterComments.map(x => (
                        <ul key={x.id} className="featured_nav">
                          <li>

                            <img src="https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-512.png" alt="avatar"
                              height="20px" width="20px" style={{ display: "block" }} />

                            <div className="featured_title"> <a className="" href="#">{x.email}</a> </div>
                          </li>

                        </ul>
                      ))
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footer_inner">
                <p className="pull-left">Copyright &copy; 2022 Berk Delil</p>
                <p className="pull-right">Developed By Berk Delil</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div >

  );
}


export default App;
