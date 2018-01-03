# A simple GraphQL wraper for the Goodreads API

Seeing as it was only for learning/concept purposes, this only wraps the authors endpoint.

### Setup

```bash
export GOODREADS_API_KEY={YOUR_API_KEY}
git clone https://github.com/NoahCardoza/graphql-goodreads.git
cd graphql-goodreads
npm install
npm start
```

This will start a GraphiQL server at `http://localhost:4000/graphql` where you can send queries.

#### For example
```graphql
{
  author(id: 160033) {
    name,
    books {
      id,
      title,
      isbn
      authors {
        id,
        name,
      }
    }
  }
}

```
