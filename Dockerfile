FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /override2
COPY override2.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet dev-certs https --clean && dotnet dev-certs https -t