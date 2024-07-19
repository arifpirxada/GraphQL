import { useQuery, gql, useMutation } from "@apollo/client"

const GET_TODOS = gql`
    query GetTodos {
        todos {
            id
            todo
            completed
            userId
        }
    }
`

// const UPDATE_TODO = gql`
//     mutation updateTodo($UpdateTodoInput: Object!) {
//         updateTodo (input: $UpdateTodoInput) {
//             id
//             todo
//             userId
//         }
//     }
// `

function Todo() {

    // Get Todo Data => 
    const { data, loading, error } = useQuery(GET_TODOS);

    if (loading) return <p>Loading Todos...</p>;
    if (error) return <p>Error: { error.message }</p>;

    // Update Todo =>
    // const [updateTodo, { data: updatedTodo, loading: updatedLoading, error: updatedError }] = useMutation(UPDATE_TODO)

    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="flex mt-4">
                            <input className="shadow appearance-none outline-none rounded w-full py-2 px-3 mr-4 text-grey-darker focus:ring-2 focus:ring-blue-500" placeholder="Add Todo" />
                            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                        </div>
                    </div>
                    <div>
                        { data.todos.map(({ id ,todo, completed }, key) => (
                            <div key={ key } className="flex mb-4 items-center">
                                <p className="w-full text-grey-darkest">{ todo }</p>
                                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">{ completed ? "Done" : "Not Done" }</button>
                                <button onClick={ () => removeTodo(this) } className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                            </div>
                        )) }
                        <div className="flex mb-4 items-center">
                            <p className="w-full text-grey-darkest">Add another component to Tailwind Components</p>
                            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                        </div>
                        <div className="flex mb-4 items-center">
                            <p className="w-full text-green">Submit Todo App Component to Tailwind Components</p>
                            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo

// Using simple fetch, ApolloClient not required =>

// useEffect(() => {
//   const fetchTodos = async () => {
//     const query = `
//         query GetTodos {
//           todos {
//             id
//             todo
//             completed
//             userId
//           }
//         }
//       `;

//     try {
//       const response = await fetch("http://localhost:4000/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ query })
//       });

//       const result = await response.json();

//       if (result.errors) {
//         console.error("GraphQL errors:", result.errors);
//       } else {
//         console.log(result.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchTodos();
// }, []);


// useEffect(() => {
//   // sending a query with plain JavaScript. =>
//   client
//     .query({
//       query: gql`
//         query GetTodos {
//           todos {
//             id
//             todo
//             completed
//             userId
//           }
//         }
//       `,
//     })
//     .then((result) => console.log(result))
//     .catch((error) => console.error("Error fetching data:", error));
// }, [client]);