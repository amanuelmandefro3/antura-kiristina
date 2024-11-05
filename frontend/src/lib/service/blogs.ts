import axios from 'axios'
export const getBlog = async (id: string) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${id}`)
    return data
}

export const getBlogs = async (currentPage:number,postsPerPage:number ) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?page=${currentPage}&size=${postsPerPage}`)
    return data
}

