import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Text, Textarea, TextInput, Container, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
const EditReview: React.FC = () => {
  const [review, setReview] = useState<any>(null);
  const  {id}= useParams<{id:string}>();

  useEffect(() => {
    // Fetch the review with the given ID from your backend API
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:5050/ws/review/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setReview(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReview();
  }, [id]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review!, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review!, content: event.target.value });
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/ws/review/${review!._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      notifications.show({
        title: "Review saved",
        message: "Your review has been saved",
      })
      // Redirect to the review list view
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5050/ws/review/${review!._id}`, {
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

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Text
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta="center"
        fz="xl"
        fw={700}
      >
        Edit
      </Text>
      <Container>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="title">Title:</label>
          <TextInput id="title" type="text" value={review.title} defaultValue={review?.title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <Textarea id="content" value={review.content} defaultValue={review?.content} onChange={handleContentChange} />
        </div>
        <br/>
        <Flex gap={10}>
          <Button color={review.title && review.content ? 'teal' : 'gray'} type="submit">Save</Button>
          <Button type="button" color='red' onClick={handleDelete}>Delete</Button>
          <Button type="button" color='blue' onClick={() => window.history.back()}>Cancel</Button>
        </Flex>
      </form>
      </Container>
    </div>
  );
};

export default EditReview;
