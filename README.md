# IVW-BMS
Repo containing codebase for data extraction from Daly-BMS and frontend for custom BMS development

# Pre-Processing Task:

Before deploying and running this application there are a few preprocessing tasks that must be completed 

1) Install Visual Studio code
Installation link: (https://code.visualstudio.com/)

Setup guide link: (https://www.youtube.com/watch?v=r9bomXarDJI)

# Setup

This section deals with the setup process for cloning the git hub repo 

Repo clone guide link: (https://www.youtube.com/watch?v=ILJ4dfOL7zs)
This is the https link https://github.com/S-Priyadharshan/IVW-BMS

Open the files in Visual Studio Code after cloning the repository

# Backend file

There are two backend files: 
1) Data.py
   - This file contains the functions to send and parse commands for the Daly-bms
   - It has functionality to send individual commands too
   - ![image](https://github.com/user-attachments/assets/7a5e8aae-a09f-45df-8b24-28b87d18e9ae)
   - just change the command_id to required command on line 282 
  
2) main.py
  - This file is for the python flash Web Socket
  - It sets up a Web Socket to fetch data from the bms via Data.py and display it every 5 seconds
  - It also emits the data which can be fetched by the React Frontend
  - Press ctrl + C to stop the data fetching process
  - To run this file go to the directory your file is in
  - Type **python main.py** in the terminal (*make sure that the file directory and your current directory are the same*)
  - ```powershell
    python main.py
    ```
  - Once it gets running it should periodically fetch the data and display it

 # Frontend

 The frontend consists of react files with components containing the individual page components along with their css files

 To deploy the frontend web app, do the following steps:
  1) Backend Deployment:
      - Ensure the your backend Web Socket server is live and fetching data periodically
      - Also ensure that the data being transmitted is received by your frontend
  2) Installing React:
      - To run the react app on your pc first we need to install it
      - First navigate to the frontend directory using this
      - ```powershell
        cd bms-dashboard
        ```
      - Next to install the required dependencies just copy paste this into the terminal
        ```powershell
        npm install
        ```
  3) Running the setup:
      - To run the web app simple navigate to the directory
      - Use the above given cd command to navigate to the directory
      - Copy the directory command and paste it in you terminal
      - Once inside the correct directory use the following command
      - ```powershell
        npm run dev
        ```
      - Your server will open at localhost:5173
      - Press ctrl and click the link to display your web app.
