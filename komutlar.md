### Backend (Spring Boot)

1. Java 17+ ve Maven kurulu olmalıdır.
2. `src/main/resources/application.properties` dosyasını veritabanı ayarlarınıza göre düzenleyin.
3. Terminalde proje kök dizininde:
    ```sh
    mvn clean install
    mvn spring-boot:run
    ```
4. API, varsayılan olarak `http://localhost:8080` adresinde çalışır.

### Frontend (React)

1. Node.js 18+ ve npm kurulu olmalıdır.
2. `MEGAFrontEnd/ReactFront/react` dizinine gidin:
    ```sh
    cd MEGAFrontEnd/ReactFront/react
    npm install
    npm run dev
    ```
3. Frontend, varsayılan olarak `http://localhost:5173` adresinde çalışır.