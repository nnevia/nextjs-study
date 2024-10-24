export default function UserProfilePage(props) {
  return <div>{props.username}</div>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Max',
    },
  };
}
