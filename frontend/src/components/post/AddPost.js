"use client"
import React, { useContext, useRef, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import pdfIcon from "../../../public/icons/pdf.svg"
import wordIcon from "../../../public/icons/word.svg"

export function AddPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [errors, setErrors] = useState({});
    const imageInputRef = useRef(null);
    const [selectedImages, setselectedImages] = useState([]);

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!title) {
            formIsValid = false;
            errors["title"] = "Please enter a title.";
        }

        if (!description) {
            formIsValid = false;
            errors["description"] = "Please enter a description.";
        }

        if (!tag) {
            formIsValid = false;
            errors["tag"] = "Please enter a tag.";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Here you would usually send data to the server
            console.log("Form is valid: ", { title, description, tag, selectedImages });
        }
    };

    const handleImageInput = (e) => {
        const files = Array.from(e.target.files);
        if (selectedImages.length + files.length > 5) {
            /* show alert */
            alert("Cannot add more than 5 files!");
            return;
        }
        setselectedImages(prevImages => [...prevImages, ...files]);
    }

    const removeImage = (index) => {
        setselectedImages(e => { const updateImgs = [...e]; updateImgs.splice(index, 1); return updateImgs; });
        imageInputRef.current.value = "";
    }

    return (
        <Card className="w-[80vw] m-auto mt-2 border-none">
            <CardHeader>
                <CardTitle>Create a Post</CardTitle>
                <CardDescription>Write your post.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Write your title of post." />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="write you description of post." value={description} onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <p className="text-red-500">{errors.description}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Images & Videos</Label>
                            <div className="flex w-full border-2 border-gray-300 border-dashed rounded-lg">
                                <label htmlFor="dropzone-file" style={selectedImages?.length > 0 ? { backgroundColor: "white" } : { alignItems: "center", justifyContent: "center" }} className="flex flex-col w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                    {selectedImages?.length > 0 ?
                                        <div className="flex flex-wrap m-5">
                                            {
                                                selectedImages.map((file, index) => (
                                                    file.type.startsWith("image") ?
                                                        <div className="justify-normal items-start z-30 px-1 relative overflow-hidden" key={index}>
                                                            <Image
                                                                key={index}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`${file}`}
                                                                className="rounded-lg border my-4 mx-4 z-30"
                                                                width={150}
                                                                height={100}
                                                                style={{ minWidth: "150px", minHeight: "100px" }}
                                                            />
                                                            <p className="w-28 text-center truncate">{file.name}</p>
                                                            <FontAwesomeIcon className="absolute delay-100 text-campus-dark py-[6px] px-[8px] rounded-full z-50 top-1 right-2 bg-gray-100" onClick={(e) => { e.preventDefault(); removeImage(index) }} onMouseOver={(e) => e.target.style.scale = "1.2"} onMouseOut={(e) => e.target.style.scale = "1.0"} icon={faClose} />
                                                        </div>
                                                        :
                                                        file.type.startsWith("application/pdf") ?
                                                            <div className="justify-normal items-start z-30 px-1 relative overflow-hidden" key={index}>
                                                                <Image
                                                                    key={index}
                                                                    src={pdfIcon}
                                                                    alt={`${file}`}
                                                                    className="rounded-lg border p-5 my-4 mx-4 z-30"
                                                                    width={80}
                                                                    height={80}
                                                                    style={{ minWidth: "100px", minHeight: "80px" }}
                                                                />
                                                                <p className="w-28 text-center truncate">{file.name}</p>
                                                                <FontAwesomeIcon className="absolute delay-100 text-campus-dark py-[6px] px-[8px] rounded-full z-50 top-1 right-2 bg-gray-100" onClick={(e) => { e.preventDefault(); removeImage(index) }} onMouseOver={(e) => e.target.style.scale = "1.2"} onMouseOut={(e) => e.target.style.scale = "1.0"} icon={faClose} />
                                                            </div>
                                                            :
                                                            file.type.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ?
                                                                <div className="justify-normal items-start z-30 px-1 relative overflow-hidden" key={index}>
                                                                    <Image
                                                                        key={index}
                                                                        src={wordIcon}
                                                                        alt={`${file}`}
                                                                        className="rounded-lg border p-5 my-4 mx-4 z-30"
                                                                        width={80}
                                                                        height={80}
                                                                        style={{ minWidth: "100px", minHeight: "80px" }}
                                                                    />
                                                                    <p className="w-28 text-center truncate">{file.name}</p>
                                                                    <FontAwesomeIcon className="absolute delay-100 text-campus-dark py-[6px] px-[8px] rounded-full z-50 top-1 right-2 bg-gray-100" onClick={(e) => { e.preventDefault(); removeImage(index) }} onMouseOver={(e) => e.target.style.scale = "1.2"} onMouseOut={(e) => e.target.style.scale = "1.0"} icon={faClose} />
                                                                </div>
                                                                :
                                                                alert("This file type is not supported.\nAllowed Types: .Docx, .PNG, .PDF, .JPG")
                                                ))
                                            }
                                        </div>
                                        :
                                        <>
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        </>
                                    }
                                    <input ref={imageInputRef} onInput={handleImageInput} multiple="multiple" accept=".jpg,.png,.jpeg,.pdf,.csv" id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            <div className="w-full h-[30px] items-center mt-3 mb-1 flex justify-between sm:col-span-3">
                                <p className={`text-primary_theme text-sm`}>You can select only 5 document.</p>
                                <button className="flex w-max items-center justify-center rounded-lg bg-campus-green py-2 px-5 text-center text-white">
                                    <FontAwesomeIcon icon={faCloudArrowUp}></FontAwesomeIcon>
                                    <span className="mt-1 ml-2">Upload</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Tag</Label>
                            <Input id="title" placeholder="Write your tag of post." value={tag} onChange={(e) => setTag(e.target.value)} />
                            {errors.tag && <p className="text-red-500">{errors.tag}</p>}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button handleClick={handleSubmit} variant="outline"><FontAwesomeIcon width={15} className="mr-2" icon={faPaperPlane} />Post</Button>
            </CardFooter>
        </Card>
    )
}
