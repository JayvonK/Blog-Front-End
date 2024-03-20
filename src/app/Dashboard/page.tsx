"use client";

import {
  Button,
  Checkbox,
  Dropdown,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";

//User's Dashboard page with their Published and unpublished Blog entries, we will also Add / Edit blog Entries
const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  // Forms
  // Description, tags, categories, title, and Image
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [img, setImg] = useState<any>("");

  const handleShow = () => {
    setOpenModal(true);

    setTitle("");
    setTags("");
    setDescription("");
    setCategories("");
    setImg("");
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const file = e.target.files?.[0]
    console.log(file);
    if(file){
      
      reader.onload = () => {
        console.log(reader.result);
        setImg(reader.result);
      }
      reader.readAsDataURL(file)
    }
  }


  return (
    <div className="flex min-h-3 flex-col p-24">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl">This is Dashboard</h1>
        <Button onClick={handleShow}>Add Blog Item</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Add Blog Item</Modal.Header>
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
            <Button onClick={() => setOpenModal(false)}>Save And Publish</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>Save</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
