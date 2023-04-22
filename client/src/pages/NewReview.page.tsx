/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Textarea, TextInput, Container, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications/';

interface Review {
  title: string;
  content: string;
}

const NewReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState<Review>({ title: '', content: '' });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, content: e.target.value });
  };

  const handleSaveClick = async () => {
    if (!review.title || !review.content) {
      return notifications.show({
        title: 'Error',
        message: 'Please fill in all fields',
      });

    }

    const res = await fetch('http://localhost:5050/ws/review', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
      },

    })

    if (res.ok) {
      console.log('Review saved');
    }

    // TODO: save review to backend or local storage
    navigate('/');
  };

  const handleResetClick = () => {
    setReview({ title: '', content: '' });
  };

  const handleCancelClick = () => {
    navigate('/');  
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
        New Review
      </Text>
      <form>
        <label htmlFor='title'>Title:</label>
        <TextInput
          type='text'
          id='title'
          value={review.title}
          onChange={handleTitleChange}
        />

        <label htmlFor='content'>Content:</label>
        <Textarea
          id='content'
          value={review.content}
          onChange={handleContentChange}
        />

<br/>
    <Flex gap={10}>
  
        <Button
          type='button'
          color={review.title && review.content ? 'teal' : 'gray'}
          onClick={handleSaveClick}
        >
          Save
        </Button>
        <Button
          color='red'
          type='button'
          onClick={handleResetClick}
        >
          Reset
        </Button>
        <Button
          color='red'
          type='button'
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
</Flex>
      </form>
    </Container>
  );
};

export default NewReviewPage;
