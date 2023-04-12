import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  // const data = [];

  /* 
    pass array for query key, not just a string
    treat query key as dependency array, when key changes => create a new query
  */
  const { isLoading, isError, error, data } = useQuery(
    ["comments", post.id],

    /* 
      comments won't refresh for different posts until query key is given
      data for queries with known keys is re-fetched only upon trigger
      example triggers: (component remount, window refocus, refetch function, automated refetch, query invalidation after mutation) 
    */

    () => fetchComments(post.id)
  );

  // delete mutation
  // no query key (not associated with data in cache)
  const deleteMutation = useMutation((postId) => deletePost(postId));

  const updateMutation = useMutation((postId) => updatePost(postId));

  console.log({ data, isError, isLoading });

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has (not) been deleted</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isLoading && <p style={{ color: "purple" }}>updating</p>}
      {updateMutation.isError && (
        <p style={{ color: "red" }}>post update failed</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>post updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
