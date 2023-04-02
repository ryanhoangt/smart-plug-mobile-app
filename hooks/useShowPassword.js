function useShowPassword(initState = false) {
  const [passwordVisibility, setPWVisibility] = useState(initState);

  function togglePasswordVisibility() {
    setPWVisibility((prev) => !prev);
  }

  return [passwordVisibility, togglePasswordVisibility];
}

export default {useShowPassword}
