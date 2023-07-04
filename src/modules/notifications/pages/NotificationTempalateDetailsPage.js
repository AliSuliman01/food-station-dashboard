import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const contact = { templateSlug: params.templateSlug };
  return { contact };
}

const NotificationTempalateDetailsPage = () => {
  const { contact } = useLoaderData();

  return <> {contact.templateSlug} </>;
};

export default NotificationTempalateDetailsPage;
