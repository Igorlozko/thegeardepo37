import { Avatar, Card, Container, Grid, Typography, Tooltip } from '@mui/material';
import { useValue } from '../../context/ContextProvider';

const Gears = () => {
  const { state: { filteredGears }, dispatch } = useValue();
  const maxDescriptionLength = 100;

  const handleGearClick = (selectedGear) => {
    console.log("Clicked gear ID:", selectedGear._id);
    dispatch({
      type: 'UPDATE_GEAR',
      payload: selectedGear
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {filteredGears.map((gear) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={gear._id}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <img
                  src={gear.images[0]}
                  alt={gear.title}
                  loading="lazy"
                  style={{ cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                  onClick={() => handleGearClick(gear)}
                />
                <Tooltip title={gear.uName}>
                  <Avatar src={gear.uPhoto} style={{ position: 'absolute', top: '8px', right: '8px', border: '2px solid #fff' }} />
                </Tooltip>
              </div>
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Typography variant="h6" onClick={() => handleGearClick(gear)} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {gear.title}
                  </Typography>
                  <Typography variant="body2" onClick={() => handleGearClick(gear)} style={{ cursor: 'pointer', color: 'gray', marginBottom: '8px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {gear.description.length > maxDescriptionLength ? `${gear.description.substring(0, maxDescriptionLength)}...` : gear.description}
                  </Typography>
                </div>
                <Typography variant="subtitle1" onClick={() => handleGearClick(gear)} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>
                  {gear.price === 0 ? 'Free Rental' : `€${gear.price}/day`}
                </Typography>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gears;
