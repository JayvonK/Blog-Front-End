import { IBlogItems, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"

const url = "http://localhost:5035"

let userData: IUserData;

export const createAccount = async (createdUser: IUserInfo) => {
    //  we're using this fetch to make a POST Request
    // We have to set the method to POST 
    // We set the content type to application/ json to specify our json data format

    const res = await fetch(url + '/User/AddUser/', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(createdUser)
    });
    // We need to check if our post was successful

    if(!res.ok){
        const message = "Ann error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data);
}

export const login = async (loginUser: IUserInfo) => {
    const res = await fetch(url + "/User/Login", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"  
        },
        body:JSON.stringify(loginUser)
    });

    if(!res.ok){
        const message = "An Error has occured " + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data = await res.json()
    userData = data;
}

export const loggedInData = () => {
    return userData
}

//This function helps to see if our user is logged in
export const checkToken = () => {
    let result = false;

    let lsData = localStorage.getItem("Token");

    if(lsData !== null){
        result = true;
    }

    return result;
}


// Dashboard Fetches

export const getBlogItemsByUserId = async (userId: number) => {
    const res = await fetch(url + '/Blog/GetItemsByUserId/' + userId);
    const data = await res.json();
    return data;
}

export const addBlogItem = async (Blog: IBlogItems) => {
    const res = await fetch( url + '/Blog/AddBlogItem', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(Blog)
    })

    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }

    //Returns a boolean value depending on whether or not we added a blog item successfully
    const data = await res.json();
    return data;
}

export const updateBlogItem = async (Blog: IBlogItems) => {
    const res = await fetch( url + '/Blog/UpdateBlogItem', {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(Blog)
    })

    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }

    //Returns a boolean value depending on whether or not we added a blog item successfully
    const data = await res.json();
    return data;
}

export const getAllBlogItems = async () => {
    const res = await fetch(url + '/Blog/GetAllBlogItems');
    const data = await res.json();
    return data;
}