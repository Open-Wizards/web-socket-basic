
import { Button, Table, Text, Container,ScrollArea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Review } from "./types";
import { useSocket } from './socket/socketContext';

const App: React.FC = () => {
  const {value, setValue}:any = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("value", value);
    // TODO: connect to WebSocket and listen for updates
    // When a new review is received, add it to the reviews state
    // When an existing review is updated or deleted, update the reviews state accordingly
    // Make sure to clean up the WebSocket connection when the component unmounts

    if (value.latestReview) {
      if (value.latestReview?._id) {
        //  check if its already in array
        const index = value.reviews.findIndex((review: any) => review._id === value.latestReview._id);
        if (index !== -1) {
          const newReviews = [...value.reviews];
          newReviews[index] =  value.latestReview;
          setValue(() => ({
            latestReview: null,
            reviews: newReviews
          }))
          return;
        }

        const newReview = value.latestReview;
        setValue((prev:any) => ({
          latestReview: null,
          reviews: [
            ...prev.reviews,
            newReview
          ]
        }))
      }
    }

    if (value.deletedId) {
      const newReviews = value.reviews.filter((review: any) => review._id !== value.deletedId);
      setValue((prev:any) => ({
        ...prev,
        deletedId: null,
        reviews: newReviews
      }))
    }
  }, [value]);

  const handleDeleteClick =async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5050/ws/review/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      else {
        notifications.show({
          title: "Review deleted",
          message: "Your review has been deleted",
        })
        window.location.href = "/";
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const renderReviewRow = (review: any, index: number) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{review.title}</td>
        <td>{review.content}</td>
        <td>{review.createdAt}</td>
        <td>
          <Link to={`/edit/${review._id}`}>Edit</Link>
        </td>
        <td>
          <Button color="red" onClick={() => handleDeleteClick(review._id)}>Delete</Button>
        </td>
      </tr>
    );
  };



  return (
    <Container>
      <Text
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta="center"
        fz="xl"
        fw={700}
      >
      Reviews List View
      </Text>
     
        <ScrollArea h={700}> 
      <Table horizontalSpacing="xl" verticalSpacing="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date-time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{value?.reviews?.map(renderReviewRow)}</tbody>
      </Table>
        </ScrollArea>
      <br />
      <Button color={'pink'} onClick={() => navigate('/new')}>
        Create New Review
      </Button>
    </Container>
  );
};

export default App;

