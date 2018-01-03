const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { getXML } = require('./helpers')

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: (book) => {
        const title = book.title[0]
        return title
      }
    },
    isbn: {
      type: GraphQLString,
      resolve: getXML('isbn')
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (book, args, ctx) =>
        ctx.authorLoader.loadMany(
          book.authors[0].author
          .map(getXML('id'))
        )
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: getXML('id')
    },
    name: {
      type: GraphQLString,
      resolve: getXML('name')
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author, args, ctx) =>
        ctx.bookLoader.loadMany(
          author.books[0].book
          .map(book => book.id[0]._)
        )
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, ctx) => ctx.authorLoader.load(args.id)
      }
    })
  })
})
