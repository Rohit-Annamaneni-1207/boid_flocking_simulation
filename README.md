# boid_flocking_simulation

In nature, we can observe that flocks of birds and schools of fish move in quite interesting patterns. However, these movements can reconstructed by following three simple rules:

1) Cohesion : All members of the flock stay together (Find the average position vector and add acceleration in that direction)
2) Seperation: All members of the flock try to actively avoid collision with one another (For every boid, add acceleration away in proportion to 1/dist)
3) Alignment: All members move in the same direction (find avg velocity vector and add acceleration in that direction)

These three simple but effective rules help recreate this phenomenon
