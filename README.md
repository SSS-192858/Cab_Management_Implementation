# Cab_Management_Implementation

## How to Run

### Option 1 - To Run with Docker

The commands to install docker and docker compose on linux are as follows (assuming you have curl installed on the system)- 

```
sudo apt update
sudo snap install docker
sudo apt install docker-compose.
```

If these do not work, you can also install docker using snap as follows (assuming you have curl installed on the system)- 

```
sudo apt update
sudo apt install snapd
sudo snap install docker
sudo apt install docker-compose.
```

Kindly follow the following tutorial in case you face any difficulties - 
https://phoenixnap.com/kb/install-docker-compose-on-ubuntu-20-04


To start the docker service, we first run this command to check the name of the docker service -
```
sudo systemctl list-units --type=service
```

Following this, the service can be started and verified using the following commands -
```
systemctl start <name>
systemctl status <name>
```

To provide the required permissions to docker compose, we run the following commands - 

```
which docker-compose
```

This provides the path to the docker compose installed on the system, using which the permissions can be updated using the following commands - 

```
sudo chmod +x <path-to-docker-compose>
sudo usermod -aG docker $USER 
sudo chgrp docker <path-to-docker-compose>
sudo chmod 750 <path-to-docker-compose>
```

Finally we can run the docker compose file by changing to the directory which contains the docker-compose.yml file and running the following command
```
sudo docker-compose up
```

The running containers can be stopped using the command 

```
sudo docker-compose down
```

The commands to delete all the exited docker containers and images to rebuild everything are as follows - 

```
docker rm $(docker ps -a -f status=exited -q)
docker rmi $(docker images -a -q)
```

The command to remove only a particular docker container is as follows - 

```
docker rm <container_name>
```

Correspondingly, the command to remove a single docker image is as follows - 

```
docker rmi <image_name>
```

Possible errors encountered while runnning may include -
1. Permission denied for mvnw file - This occurs when we are not allowed to access the mvnw file in the backend code. This can be resolved by running the following commands - 

```
cd cabs/
chmod +x mvnw
cd ..
```

2. Process running on required ports - This can be resolved by killing the process running on the particular port. This can be done by first obtaining the pid of the process, and then killing it using the following commands - 
```
sudo ss -tanp | grep <port>
sudo kill -15 <pid>
```
We can also change the port numbers used in the docker-compose.yml file and the Dockerfiles. However, this solution is prone to multiple errors in case we forget to change the port numbers everywhere.

### Option 2 - To Run without Docker

Hi Peeps! This if for those guys who have trouble with Docker :upside_down_face:. Here is the way for you guys to run it.

1. You need to have MySQL,Java and NodeJs installed in your systems. For installation of those kindly refer to their
respective documentation. 
    [MySQL-Shell](https://dev.mysql.com/downloads/shell/)
    [MySQL-WorkBench](https://dev.mysql.com/downloads/workbench/)
    [Java](https://www.oracle.com/in/java/technologies/downloads/)
    [Node](https://nodejs.org/en)
2. Download the four softwares suitable for your operating system.
3. Next clone this repository.
4. First go to the SQL folder present at the same level `cd SQL` or any other equivalent in your OS.
5. Then run the follwing command in your terminal `source create_script.sql`. This shall create the necessary database in you local computer. This can also be done by opening the script in workbench, and running it.
6. Next go to elecfr_web and type the following in the terminal. `npm install` This shall download all the necessary packages required to run the front-end in your local system.
7. Now go to the cabs folder and then to src/main/resources. `cd src/main/resources`/ it's equivalent in your OS.
8. Go to *application.properties* file and then **comment in the first three lines**.
9. Make sure to add your *username* and *password* in those fields.
10. Next run the spring boot application(CabsApplication*) using any IDE (we recommend IntelliJ), or type the following command in your terminal ```mvn spring-boot:run```
11. Now head back to the src folder in cabfr_web and run the *App.js* using the `npm start` command.
12. You can now access the frontend using any browser at http://localhost:3000/


## Database

1. The Cab_Schema.pdf file contains the visual representation of the schema that our database follows. 
2. The SQL folder contains a sql script to initialise the database and the various tables, along with some sample data for testing purposes and to streamline the process of testing.
3. The SQL folder also contains a dockerfile to initialise a docker image, which runs the create script at the time of running the image.
4. A description of the tables in the database is provided.

### Description of Tables

1. **user** - This table contains the details about all the users that have been registered with our service. It contains the **user_id**,**username** and **password**. This table is used in authenticating the user.

2. **role** -  This table contains the roles of users in our application. The three roles here are:
- Customer
- Driver
- Admin 

3. **user-roles** - This table is used in mapping the user to their respective roles. This contains **role_id**,**user_id** which shall be used in the mappings.

4. **driver** - This table is used to store the driver details (**driver_name**, **driver_email** and **driver_phno**) for a given user who is a customer. It contains a foreign key mapping to the **user_id** of the user which it references, along with other fields. This mapping is unique to ensure one-one mapping.

5. **customer** - This table caters to the customer entity in the backend. It contains all the necessary details pertaining to the customer. For eg.
it contains columns such as **customer_name**,**customer_phone** . This also contains the **user_id** column that shall map to a unique *user* in the **user** table.

6. **cab** - This table stores a record of all the cabs in the database. It contains the **registration_number**, **model**,**colour** and **fare** fields. It also contains an **driver_id** to map to the driver who drives the car. 

7. **request** - This table stores the information of all the requests made by the customers. It contains necessary information such as **customer_id** (this shall map this record to a unique *customer* in the **customer** table.),**registration_number**(this shall map this record to a unique *cab* in the **cab** table.). This also contains the **start_date** and **end_date** representing the request period.

8. **customer_cab** - This table stores the information of all the customer cab bookings, i.e. which customer takes which cab, and the duration of the same. It basically represents a request which has been approved by the admin or by the driver for the given cab.

## Backend

The app can consist of various users broadly categorised into 3 roles, depending on their function :- 
1. **Customer** - They request for cabs for specified time periods.
2. **Drivers** - Every cab has a driver assigned to them who drive the cab.
3. **Admin** - Manages overall system and has the task of mainly registering cabs and drivers; Has unrestricted access.

Most of the backend functionality is achieved through various pre-defined end points, and controlling the access to these endpoints, allows us to achieve the desired output. The backend is written in spring boot.

The application architecture is as follows: -

***REST Contollers*** - 
They contain the necessary endpoints for the respective entities and they are responsible for interacting with the web and the application. Respective functions from services are called and values are for the same are returned.

***Services***- They act as bridge between the *REST Controllers* and the *Repositores*. They shall call the respective functions from the *Repositories/DAOs* and the values are returned to the *REST Controller*.

***Repositories/DAOs*** - 
They are responsible for communicating with the database. All the operations to the database are headed from here. 

The various endpoints are - 

* **/register_admin /register_driver** - Only admin has access to these endpoints. They allow the admin to register a driver / a new admin user and store their details in the database.
* **/register_customer** - All kind of users have access to this endpoint. Everyone can register themselves as a customer to avail the services.

* **/authenticate** - Any person who has been registered with the database can use this endpoint to login with valid credentials. If the user is logged in successfully, they recieve a jwt token which is stored locally and auto logs in the user until it expires, after which user must log in again.

* **/customer/getAll** - See all customers registered with the organization. Only an admin has access to this endpoint.
* **/customer/getCustomer/\*\*** - Get details of a particular customer by their customer id. This can be used by a customer or an admin to view details of the customer.
* **/customer/delete/\*\*** - Delete a customer record from the database(The *customer id* will be pass as *id - (Path Variable)*). Admins have access to this endpoint
* **/customer/save** - Save details of a customer when registering them. Customers have access this endpoint.
* **/customer/update** - Update details of an already registered customer. Can be done by a customer wanting to update their own details.
* **/customer/getByUser** - Get details of a customer from user id, which is obtained by sending the jwt token as part of an authorization header, using which the customer details can be accesed. Only accessible to a customer trying to see their personal details.

* **/cabs/allCabs** - Show all cabs offered by the organisation. Can be viewed by everyone who has logged in.
* **/cabs/\*\*** - Endpoint to get the particular cabs by *registration_number*. Customers and admins have access to this endpoint.
* **/cabs/delete/** - Endpoint to delete the cabs.
Only Admins have access to this functionality and endpoint.
* **/cabs/addCab** - Used to save a cabs in the database. Only Admins have access to this endpoint.
* **cabs/updateCab** - Used to update a particular existing cab in the database. Admins have access to this endpoint.
* **cabs/removeDriver\*\*** - Used to remove an assigned driver from the specified cab. Only Admins have access to this endpoint.
* **/cabs/updateDriver/\*\*** - Used to assign/update a driver to a specified cab. Only Admins have access to this endpoint.
* **/cabs/getByDriverId/\*\*** - used to get cabs are that have been assigned to a particular driver. Admins and Drivers have access to this endpoint.

* **/customerCab/getAll** - Used to get all the customer cabs relations. Accessible to Admins.
* **/customerCab/\*\*** - Used to get a particular customer cabs record whose *id* is passed as *Path Variable - id*. This endpoint is accessible by all users.
* **/customerCab/accept** - Used to accept a request made by a customer and then save it as a customer cabs relation in the database. Only Accessible by admins.
* **/customerCab/delete/\*\*** - Used to delete a customer cabs record. Accessible to all users.
* **/customerCab/driver/\*\*** - used to get the list of customer cabs records of customers who are enrolled under the cabs that are driven by a particular driver.
Drivers and Admins have access to this endpoint.
* **/customerCab/customer/\*\*** - used to get the list of customer cabs records of cabs that the customer has enrollend himself in.Customers and admins have access to this endpoint.
* **/customerCab/cab/\*\*** - used to get the list of studnet cabs records of cabs whose *registration_number* will be passed as *Path Variable*.Only drivers and admins have access to this endpoint.

* **/requests/allRequests** - See all requests. Only admin has access to this endpoint.
* **/requests/\*\*** - Get details of a request made for a cabs by its id. Can be viewed by any type of user.
* **/requests/customer/\*\*** - Get all requests that belong to a particular customer (The *customer id* will be pass as *id - (Path Variable)*). Only admin (to view for all customers) and customers (to view all their pending requests) can access this endpoint.
* **/requests/driver/\*\*** - Get all requests that belong to any cabs driven by a particular driver (The *driver id* will be pass as *id - (Path Variable)*). Only admin (to view for all drivers) and drivers (to view all their pending requests) can access this endpoint.
* **/requests/cab/\*\*** - Get all requests for a particular cabs by its cab's *registration_number*. Only admin (to view for all cabs) and drivers (provided its a cabs they drive) can access this endpoint.
* **/requests/save** - Make a new request. customers can make a request.
* **/requests/delete** - Delete a request. All of them can access this request.
* **/driver/getAll** - View all drivers on the platform. Can be seen by admin.
* **/driver/getDriver/\*\*** - View a particular driver by their id. This can be used by an driver or admin to view details of the driver.
* **/driver/delete/\*\*** - Delete an driver record from the database(The *driver id* will be pass as *id - (Path Variable)*). Admins and drivers have access to this endpoint.
* **/driver/save** - Save details of a driver when registering them. only drivers can access this endpoint.
* **/driver/update** - Update details of an already registered driver. Can be done by a driver wanting to update their own details.
* **/driver/gteByUser** - Get details of a driver from user id, which is obtained by sending the jwt token as part of an authorization header, using which the driver details can be accesed. Only accessible to a driver trying to see their personal details.

The cabs folder also contains a Dockerfile to initialise a docker image, which runs the backend.
Also, in order to view all the json object formats of the requests that can be made to the backend, refer to the Formats directory.

## Frontend

The frontend of the application is written in React.js. The folder containing the same is **cabfr_web** There is a single nav bar which shows options based on who is logged in, (customer, driver, admin or no one), and provides to links to go to these web pages. The components are roughly classified into the following types:

1. **Validation functions** - These are used to validate the entries filled in the various forms, and enforce validation rules on the inputs being sent, and display error messages to the respective components for any invalid inputs. They are stored in the validators subdirectory in src. The files are as follows - 

    1. **validators.js** - the common validators to be used by all the components
    2. **DriverUpdateValidator.js** - the validator for the form shown to update an driver's details.
    3. **loginFormValidator.js** - the validator for the form shown to login to the application.
    4. **signupAdminValidator.js** - the validator for the form shown to register a new admin account to the application.
    5. **signupDriverValidator.js** - the validator for the form shown to register a new driver account to the application.
    6. **signupCustomerValidator.js** - the validator for the form shown to register a new customer account to the application.
    7. **RequestCabValidator.js** - the validator for the form shown to register a new request by a given customer.
    8. **CabSaveValidator.js** - the validator for the form shown to save/update a cabs.

2. **Services** - These contain services used by the application to handle variables in local storage, and to send requests to the backend, which runs on localhost:8080. They are stored in services subdirectory of src, and are as follows - 

    1. **auth_header.js** - a single function to extract the jwt token stored in local storage, to send in requests as a header.
    2. **auth_services.js** - contains all functions to handle authentication services in the application (login, signup, token management etc.)
    3. **localStorageHandler.js** - a number of variables are stored in local storage to prevent loss in case of page refresh, this file contains all functions to handle the same.
    4. **user_services.js** - all the other functions to send varied requests to the backend are stored here.
    5. **request_services.js** - contains all functions to handle request related services.

3. **List items** - These contain the list items shown on screen as a part of the list components. All list item components are clickable, and show a summary of the items they represent, and provide links to see full details of the item. Kindly refer to the files to find comments which explain the working of the same. They are present in the common subdirectory of the src directory and the name of the directory is *commons*.

4. **Components** - These are the screens of the application which are shown to the user. They contain forms to create/ update data present in the db, lists to see lists of various entities requested by the user (customers, cabs, requests etc) and details components to see the details of a particular entity. The names of the files can be used to identify which screen serves which purpose. We only show screens to the user which he/she is allowed to access. Kindly refer to the comments present in various screens to find details of implementation. They are present in the components subdirectory of the src folder.

5. **Dockerfile** - The dockerfile is also available for the frontend. It builds the project, installs required node modules, and runs the command to provide an image for the frontend.

## Other Links
1. The link to the digital asset engineering guide is as follows - https://docs.google.com/document/d/1cFKj3P29J-JkyX3x5flS6IWnTE6GJt9SdBS4ZewAlro/edit?usp=sharing
2. The link to the folder containing the demo videos is as follows - https://drive.google.com/drive/folders/1cv94AmvWgTYDokt-_pNo8sPMR-lpHDFC?usp=sharing
