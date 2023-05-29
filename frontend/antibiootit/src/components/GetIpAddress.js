
const ipAddresses = [1, 2, 3, 4, 5];

try {
    const [ipAddress, setIpAddress] = useState(null);

    setIpAddress (await fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    .then(data => console.log(data.ip)));

    for (let i = 0; i < ipAddresses.length; i++) {
        if (i == ipAddress) {
            
        }
      }


} catch (err) {
    console.log(err);
    throw new Error("An error occurred");
}   