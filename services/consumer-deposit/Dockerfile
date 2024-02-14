# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

# Update pip
RUN pip3 install --upgrade pip

# Install necessary packages and Microsoft ODBC Driver for SQL Server
RUN apt-get update && apt-get install -y --fix-missing unixodbc-dev gnupg curl
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17

# Install any needed packages specified in requirements.txt
COPY ./requirements.txt /app
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# Make port 5000 available to the world outside this container
# EXPOSE 8080

# Run server.py when the container launches
CMD ["python", "consumer.py"]