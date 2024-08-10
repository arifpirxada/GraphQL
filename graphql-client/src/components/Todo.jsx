    import { useQuery, gql, useMutation } from "@apollo/client"
    import { useState, useEffect } from "react";

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

    const CREATE_TODO = gql`
        mutation createTodo($TodoInput: TodoInput!) {
            createTodo (input: $TodoInput) {
                todo
                userId
            }
        }
    `

    function Todo() {

        // Get Todo Data => 
        const { data, loading, error } = useQuery(GET_TODOS);
        const [filteredTodos, setFilteredTodos] = useState([]);

        
        // Create Todo =>
        const [createTodo, { data: newTodo, loading: newLoading, error: newError }] = useMutation(CREATE_TODO, {
            refetchQueries: [{ query: GET_TODOS }],
        });
        const[todo, setTodo] = useState("");
        const[search, setSearch] = useState("");

        useEffect(() => {
            if (data && data.todos) {
                const filtered = data.todos.filter((todoItem) => 
                    todoItem.todo.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredTodos(filtered);
            }
        }, [search, data]);


        if (loading) return <p className="text-white text-center">Loading Todos...</p>;
        if (error) return <p>Error: { error.message }</p>;

        const handleCreateTodo = (e) => {
            e.preventDefault();
            if (!todo.trim()) return;
            const todoInput = {
                todo: todo,
                userId: "1"
            };
        
            createTodo({
                variables: {
                    TodoInput: todoInput
                }
            }).then(response => {
                setTodo("");
            }).catch(error => {
                console.error(error);
            });
        };


        return (
            <>
                <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                    <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                        <div className="mb-4">
                            <h1 className="text-grey-darkest">Todo List</h1>
                            <form className="flex mt-4">
                                <input value={ todo } onChange={(e) => setTodo(e.target.value)} className="shadow appearance-none outline-none rounded w-full py-2 px-3 mr-4 text-grey-darker focus:ring-2 focus:ring-blue-500" placeholder="Add Todo" />
                                <button type="submit" onClick={(e) => handleCreateTodo(e)} disabled={newLoading} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">{newLoading ? 'Creating...' : 'Add'}</button>
                            </form>
                        </div>
                        <div className="mb-4">
                            <input value={ search } onChange={(e) => setSearch(e.target.value)} className="shadow appearance-none outline-none rounded w-full py-2 px-3 mr-4 text-grey-darker focus:ring-2 focus:ring-blue-500" placeholder="Search" />
                            {newError && <><p className="mt-6 mb-2">Error: {newError.message}</p><hr className="mb-6"/></>}
                            {newTodo && <><p className="mt-6 mb-2">Todo created: {newTodo.createTodo.todo}</p><hr className="mb-6"/></>}
                        </div>
                        <div>
                            { (search? filteredTodos : data.todos).map(({ id ,todo, completed }, key) => (
                                <div key={ key } className="mb-6">
                                    <div className="flex gap-4 items-center">
                                        <p>{ id }. </p>
                                        <p className="w-full my-2 text-grey-darkest">{ todo }</p>
                                    </div>
                                    <hr />
                                </div>
                            )) }
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