export const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log("name:", name);
    console.log("value:", value);
    
    return {
        [name]: value
    };
  };