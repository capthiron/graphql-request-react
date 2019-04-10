# graphql-request-react

[![npm version](https://badge.fury.io/js/graphql-request-react.svg)](https://badge.fury.io/js/graphql-request-react)

React wrapper for [graphql-request](https://www.npmjs.com/package/graphql-request). 💣


## Install
Yarn:

`yarn add graphql-request-react`

or

Npm:

`npm install graphql-request-react`

## Quickstart
Send a GraphQL query to render an image of Pikachu ⚡. [Try the demo ➡](https://bit.dev/capthiron/graphql-request-react/demo)

```jsx
const App = () => {
  const url= 'https://graphql-pokemon.now.sh'
  
  const query = `{
    pokemon(name: "Pikachu") {
      image
    }
  }`

  return (
    <Request url={url} query={query}
      render={data => 
        <img alt={"pokemon"} src={data.pokemon.image}/>
      }
    />
  )
}
```

## Import
```jsx
import Request from 'graphql-request-react'
```

## Examples
#### Providing variables for a query
```jsx
const query = `getPokemon($name: String!) {
  pokemon(name: $name) {
    image
  }
}`

return (
  <Request url={url} query={query}
    /*Add variables object with the variable values*/
    variables={ {name: "Pikachu"} }
    render={data => 
      <img alt={"pokemon"} src={data.pokemon.image}/>
    }
  />
)
```

#### Adding HTTP header
```jsx
<Request url={url} query={query}
  /*Add an options object with appropriate HTTP headers*/
  options={ {headers: {authorization: 'AUTH_TOKEN'}} }
  render={data => 
    <img alt={"pokemon"} src={data.pokemon.image}/>
  }
/>
```

#### Handling Loading
You can add a loading function that will be used for rendering during the fetching process.
```jsx
<Request url={url} query={query}
  render={data => 
    <img alt={"pokemon"} src={data.pokemon.image}/>
  }
  /*Add loading function*/
  loading={() => <h4>Loading Pikachu from Pokedex...</h4>}
/>
```

#### Handling Errors
You can add a error function that will be used for rendering in case of an error.
```jsx
<Request url={url} query={query}
  render={data => 
    <img alt={"pokemon"} src={data.pokemon.image}/>
  }
  /*Add error function*/
  error={(err) => <h4>Couldn't find Pikachu in Pokedex because of {err.message}!</h4>}
/>
```

## Props
| Name        | Required | Description                                                                                          | Type     |
|-------------|----------|------------------------------------------------------------------------------------------------------|----------|
| `url`       | **Yes**  | Url of the graphql endpoint                                                                          | String   |
| `query`     | **Yes**  | Graphql query                                                                                        | String   |
| `render`    | **Yes**  | Render function that gets the requested `data` passed in as an object                                | Function |
| `loading`   | No       | Render function during loading stage                                                                 | Function |
| `error`     | No       | Render function in case of an error                                                                  | Function |
| `variables` | No       | Object that provides the variables to a given query                                                  | Object   |
| `options`   | No       | Object that contains [fetch options](https://www.npmjs.com/package/fetch#options) like http-headers. | Object   |

#### More coming soon...
- Example for mutations
- Trigger function
