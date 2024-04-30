import React, { useState, useRef } from 'react';
import { Box, Button, Image, Input, useToast } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';

const Index = () => {
  const [image, setImage] = useState(null);
  const [pieces, setPieces] = useState([]);
  const inputRef = useRef(null);
  const toast = useToast();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        scrambleImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: 'Invalid file type.',
        description: "Please upload an image file.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const scrambleImage = (imageSrc) => {
    // This function will scramble the image into pieces
    // For now, it's a placeholder
    setPieces([imageSrc]); // Placeholder to set pieces as the whole image
  };

  const onPieceDrop = (event, index) => {
    event.preventDefault();
    // Logic to handle piece drop
    // Placeholder logic
    toast({
      title: 'Piece placed.',
      description: `You placed piece ${index + 1}.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button leftIcon={<FaUpload />} colorScheme="teal" onClick={() => inputRef.current.click()}>
        Upload Image
      </Button>
      {image && (
        <Box mt={4}>
          {pieces.map((piece, index) => (
            <Image
              key={index}
              src={piece}
              alt={`Puzzle piece ${index + 1}`}
              draggable="true"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onPieceDrop(e, index)}
              boxShadow="base"
              m={1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Index;