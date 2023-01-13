//--------------Authentication-------------

function User(name,email,password,username,mobile,description){
    this.name=name;
    this.email=email;
    this.password=password;
    this.username=username;
    this.mobile=mobile;
    this.description=description;
}

function getInputValue(id){
    return document.getElementById(id).value;
}

async function Register(){

    const name=getInputValue("name");
    const email=getInputValue("email");
    const password=getInputValue("password");
    const username=getInputValue("username");
    const mobile=getInputValue("mobile");
    const description=getInputValue("description");

    let user=new User(name,email,password,username,mobile,description);

    user=JSON.stringify(user);

    let register_api=`https://masai-api-mocker.herokuapp.com/auth/register`;

    let response=await fetch(register_api,{
        method:"POST",
        body:user,
        headers:{
            "Content-Type":"application/json",
        }
    })
 let data=await response.json();
 console.log(data)
 alert("Registration Sucessfully Done!!!")

}


async function Login(){
    let login_data={
        username:document.getElementById("login-username").value,
        password:document.getElementById("login-password").value,
    }
    login_data=JSON.stringify(login_data);
    const login_api=`https://masai-api-mocker.herokuapp.com/auth/login`;

    let res=await fetch(login_api,{
        method:"POST",
        body:login_data,
        header:{
            "Content-Type":"application/json",
        }
    });
    let data=await res.json();
    console.log(data);
    alert("Login Sucessfully Done!!!")


    let username=document.getElementById("login-username").value;
    getProfile(username,data.token)
    console.log(data)
}

async function getProfile(username,token){
   const api=`https://masai-api-mocker.herokuapp.com/user/${username}`;

    let res=await fetch (api,{
        method:"POST",
        body:login_data,
        header:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        }
    });
   let data=await res.json();
   console.log(data)
}