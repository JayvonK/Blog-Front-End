"use client";

import {
  Accordion,
  Button,
  Dropdown,
  FileInput,
  Label,
  ListGroup,
  Modal,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
// the @ when pathing through our folder structure represents our root folder
import BlogEntries from '@/utils/BlogEntries.json';
import { IBlogItems } from "@/Interfaces/Interfaces";
import NavBarComponent from "../components/NavbarComponent";
import { addBlogItem, checkToken, getBlogItemsByUserId, loggedInData, updateBlogItem } from "@/utils/Dataservices";
import { useRouter } from "next/navigation";
// import { format } from 'date-fn';

//User's Dashboard page with their Published and unpublished Blog entries, we will also Add / Edit blog Entries
const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [blogItems, setBlogItems] = useState<IBlogItems[]>();

  // Forms
  // Description, tags, categories, title, and Image
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [img, setImg] = useState<any>("");
  const [blogUserId, setBlogUserId] = useState<number>(0);
  const [publisherName, setPublisherName] = useState<string>("");
  const [blogId, setBlogId] = useState<number>(0);

  //Booleans
  const [editBool, setEditBool] = useState<boolean>(true);

  let router = useRouter();

  // This useEffect will grab the user's information as well as their blog info,
  // Will perform a check if user is logged in if not it will take them to the login page
  useEffect(() => {

    // Async function because we are calling getBlogItemsById Fetch
    const getLoggedInData = async () => {
      // Storing our user info in a variable
      const loggedIn = loggedInData();
      let userBlogItems: IBlogItems[] = await getBlogItemsByUserId(loggedIn.userId);
      let filteredBlogItems = userBlogItems.filter(item => item.isDeleted === false);
      // Setting our user info / Fetched data inside of our State Variables
      setBlogUserId(loggedIn.userId);
      setPublisherName(loggedIn.publisherName);
      setBlogItems(filteredBlogItems);
    }

    // Checks if We have a token in local storage if so get user info else go back to login
    if (checkToken()) {
      getLoggedInData();
    } else {
      router.push('/')
    }
  }, [])

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let item: IBlogItems = {
      id: blogId,
      userID: blogUserId,
      publishedName: publisherName,
      description: description,
      date: new Date().toString(),
      title: title,
      image: img,
      tags: tags,
      categories: categories,
      isPublished: e.currentTarget.textContent === "Save And Publish" ? true : false,
      isDeleted: false
    }

    let result = false;

    // If edit bool is true we are updating our blog item
    // If it is false we should be adding a new blog item
    if (editBool) {
      result = await updateBlogItem(item);
    } else {
      result = await addBlogItem(item);
    }

    // if our blogs updated / add we will call our blog items again from our api
    if (result) {
      let userBlogItems: IBlogItems[] = await getBlogItemsByUserId(blogUserId);
      let filteredBlogItems = userBlogItems.filter(item => item.isDeleted === false);
      setBlogItems(filteredBlogItems)
    }

    setOpenModal(false);
  }

  const handleShow = () => {
    setOpenModal(true);
    setEditBool(false);
    setTitle("");
    setTags("");
    setDescription("");
    setCategories("");
    setImg("");
  }

  const handlePublish = async (items: IBlogItems) => {
    items.isPublished = !items.isPublished;
    let result = await updateBlogItem(items);

    if (result) {
      const loggedIn = loggedInData();
      let userBlogItems: IBlogItems[] = await getBlogItemsByUserId(loggedIn.userId);
      let filteredBlogItems = userBlogItems.filter(item => item.isDeleted === false);
      setBlogItems(filteredBlogItems);
    }
  }

  const handleEdit = (items: IBlogItems) => {
    setEditBool(true);
    setOpenModal(true);
    setBlogId(items.id);
    setPublisherName(items.publishedName)
    setTitle(items.title);
    setTags(items.tags);
    setDescription(items.description);
    setCategories(items.categories);
    setImg(items.image);

  }

  const handleDelete = async (items: IBlogItems) => {
    items.isDeleted = !items.isDeleted;
    let result = await updateBlogItem(items);
    if (result) {
      const loggedIn = loggedInData();
      let userBlogItems: IBlogItems[] = await getBlogItemsByUserId(loggedIn.userId);
      let filteredBlogItems = userBlogItems.filter(item => item.isDeleted === false);
      setBlogItems(filteredBlogItems);
    }
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const file = e.target.files?.[0]
    console.log(file);
    if (file) {
      reader.onload = () => {
        console.log(reader.result);
        setImg(reader.result);
      }
      reader.readAsDataURL(file)
    }
  }



  return (
    <>
      <NavBarComponent />
      <div className="flex min-h-3 flex-col p-24">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl">This is Dashboard</h1>
          <Button onClick={handleShow}>Add Blog Item</Button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>{editBool ? 'Edit ' : 'Add '} Blog Item</Modal.Header>
            <Modal.Body>
              <form className="flex max-w-md flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Title" value="Title" />
                  </div>
                  <TextInput onChange={handleTitle} id="Title" type="text" placeholder="Enter Title" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Description" value="Description" />
                  </div>
                  <TextInput onChange={handleDescription} id="Description" type="text" placeholder="Enter Description" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Tags" value="Tags" />
                  </div>
                  <TextInput onChange={handleTags} id="Tags" type="text" placeholder="Enter Tags" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Picture" value="Picture" />
                  </div>
                  <FileInput onChange={handleImg} accept="image/png, image/jpg" id="Picture" placeholder="Choose Image" required />
                </div>
                <div className="flex items-center gap-2">
                  <Dropdown label="Dropdown button" dismissOnClick={true}>
                    <Dropdown.Item onClick={() => setCategories("Sports")}>Sports</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategories("Martial Arts")}>Martial Arts</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategories("Fitness")}>Fitness</Dropdown.Item>
                  </Dropdown>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSave}>Save And Publish</Button>
              <Button color="gray" onClick={handleSave}>Save</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
            </Modal.Footer>
          </Modal>
          <Accordion alwaysOpen>
            <Accordion.Panel>
              <Accordion.Title>Publish Blog Items</Accordion.Title>
              <Accordion.Content>
                <ListGroup className='w-484'>

                  {
                    blogItems && blogItems.map((item, idx) => {
                      return (
                        <div key={idx}>
                          {
                            item.isPublished && <div className="flex flex-col p-10">
                              <h1 className="text-2xl">{item.title}</h1>
                              <div className="flex flex-row space-x-3">
                                <Button color='blue' onClick={() => handleEdit(item)}>Edit</Button>
                                <Button color='yellow' onClick={() => handlePublish(item)}>Unpublish</Button>
                                <Button color='red' onClick={() => handleDelete(item)}>Delete</Button>
                              </div>
                            </div>
                          }
                        </div>
                      )
                    })
                  }

                </ListGroup>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Unpublished Blog Items</Accordion.Title>
              <Accordion.Content>
                <ListGroup className='w-484'>
                  {
                    blogItems && blogItems.map((item, idx) => {
                      return (
                        <div key={idx}>
                          {
                            !item.isPublished && <div className="flex flex-col p-10">
                              <h1 className="text-2xl">{item.title}</h1>
                              <div className="flex flex-row space-x-3">
                                <Button color='blue' onClick={() => handleEdit(item)}>Edit</Button>
                                <Button color='yellow' onClick={() => handlePublish(item)}>Publish</Button>
                                <Button color='red' onClick={() => handleDelete(item)}>Delete</Button>
                              </div>
                            </div>
                          }
                        </div>
                      )
                    })
                  }
                </ListGroup>
              </Accordion.Content>
            </Accordion.Panel>

          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
