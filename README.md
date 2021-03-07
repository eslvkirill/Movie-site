<h1>Movie-site</h1>
Web application, that implements the sale of films online (online movie store).

<h2>Description</h2>

The functional component of the online store includes the following functions:
<ul>
  <li>Filtering (by genre, country, director) and sorting (by original/russian name, year, rating, price, default (id));</li>
  <li>Pagination on the home page;</li>
  <li>Registration and login;</li>
  <li>Administrator panel (creating films, adding/updating genres, adding actors and directors, tracking statistics of sold films per month and the top-selling products);</li>
  <li>A single page of the film (detailed description, trailer, reviews of registered users with pagination);</li>
  <li>Rating the film on the 10th scale;</li>
  <li>Shopping cart;</li>
  <li>Orders history (display order with date, cost and purchased films).</li>
</ul>

<h2>Install</h2>

To start and work correctly the client part, you must:
<ol>
  <li>node js latest version;</li>
  <li>The package manager npm or yarn of the latest version;</li>
  <li>Go to the ui folder and start the project using the npm start / yarn start command.</li>
</ol>

For the server to start and work correctly, you must:
<ol>
  <li>JDK 14+ version;</li>
  <li>Maven 3+ version;</li>
  <li>PostgreSQL 13+ version; you need to create a movie-site database, all tables and test data will be generated automatically, since Liquibase is used;</li>
  <li>Build the project using the command mvn clean install;</li>
  <li>Run the application using the java -jar {project.location} / movie-site / target / movie-site- {version} .jar command.</li>
</ol>

Login data for admin (use email or username):
<ul>
  <li>email: admin@mail.ru</li>
  <li>username: admin</li>
  <li>password: 123456</li>
</ul>

— At the moment, the database with films is disabled, because the subscription to Yandex.Cloud has ended.
