import { useCallback ,useEffect } from "react"
import { useForm } from "react-hook-form"
import {Buttons,Input,RTE,Select} from ".."
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PostForm({post}) {
  const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      slug: post?.$id || "",

    }
  })
  const navigate = useNavigate()
  const userData=useSelector((state) => state.auth.userData)

  const submit= async (data)=>{
    if (post){
      const file=data.image[0]? await appwriteService.uploadFile(data.image[0]) : undefined

      if (file){
        appwriteService.deletefile(post.featuredImage)
        // console.log("File deleted successfully",post.featuredImage);
      }
      const dbPost=await appwriteService.updatePost(
        post.$id,{...data,featuredImage:file?file.$id : undefined}
      )
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else{
      const file=await appwriteService.uploadFile(data.image[0])
      if (file) {
        const fileId= file.$id
        data.featuredImage=fileId
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if(value && value.length > 0) {
      return value
        .toLowerCase()
        // .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value,{name})=>{
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
       <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2 dark:text-white">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2  dark:text-white">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg "
                        />
                    </div>
                )}
                <Select 
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 border-gray-400 "
                    {...register("status", { required: true })}
                />
                <Buttons className="hover:bg-blue-600 w-full" textcolor="dark:text-white" type="submit" bgColor={post ? "bg-green-500" : undefined}>
                    {post ? "Update" : "Submit"}
                </Buttons>
            </div>
        </form>
    
  )
}
export default PostForm