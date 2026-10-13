// Orientation → pan helper for the binoculars view.
//
// Raw deviceorientation beta/gamma are Euler angles that go singular when the phone
// is held upright in landscape and ignore which way the phone was rotated. Instead we
// build the full rotation matrix, take the rotation RELATIVE to the pose held at Start,
// and read its small-angle components in screen axes. Result: "tilt toward the edge you
// want to look at" works the same in portrait, either landscape, and any holding pose.

const D2R = Math.PI / 180

// W3C deviceorientation: R = Rz(alpha) · Rx(beta) · Ry(gamma)  (device → earth)
export function eulerToMatrix(alpha = 0, beta = 0, gamma = 0) {
  const a = alpha * D2R, b = beta * D2R, g = gamma * D2R
  const ca = Math.cos(a), sa = Math.sin(a)
  const cb = Math.cos(b), sb = Math.sin(b)
  const cg = Math.cos(g), sg = Math.sin(g)
  return [
    [ca * cg - sa * sb * sg, -sa * cb, ca * sg + sa * sb * cg],
    [sa * cg + ca * sb * sg,  ca * cb, sa * sg - ca * sb * cg],
    [-cb * sg,                sb,      cb * cg],
  ]
}

const transpose = (m) => [0, 1, 2].map(i => [0, 1, 2].map(j => m[j][i]))
const mul = (a, b) => [0, 1, 2].map(i => [0, 1, 2].map(j => a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j]))

// Which way is the screen rotated? Decided from gravity so we never depend on how a
// given browser signs screen.orientation.angle. Returns 0, 90 or 270.
//   90  → screen-up is device +x   (phone turned counter-clockwise from portrait)
//   270 → screen-up is device −x   (phone turned clockwise)
export function screenQuarterTurn(matrix, isLandscape, fallbackAngle = 0) {
  if (!isLandscape) return 0
  const upDevX = matrix[2][0]            // earth-up expressed in device x (third row of R)
  if (Math.abs(upDevX) > 0.15) return upDevX > 0 ? 90 : 270
  return fallbackAngle === 270 ? 270 : 90
}

// How is the phone being held? Decided once, at the pose captured at Start.
//   +1 "plate"  — screen faces mostly up (held flat-ish): tilt toward the edge you want to
//                 look at (edge goes down → view goes that way).
//   -1 "aim"    — screen is upright (held up to your eyes like binoculars): point the phone
//                 where you want to look (turn right → view goes right).
// The two gestures are physically opposite, so they need opposite signs.
export function holdMode(matrix) {
  return Math.abs(matrix[2][2]) >= 0.5 ? 1 : -1    // matrix[2][2] = earth-up along the screen normal
}

// Rotation of `cur` relative to `neutral`, as pan in [-∞,∞] radians: x = right, y = down.
// Plate mode: positive = that screen edge tilted down. Aim mode: positive = pointed that way.
export function relativePan(neutral, cur, quarterTurn, mode = 1) {
  const M = mul(transpose(neutral), cur)
  const wx = 0.5 * (M[2][1] - M[1][2])   // rotation about device x
  const wy = 0.5 * (M[0][2] - M[2][0])   // rotation about device y
  let p
  switch (quarterTurn) {
    case 90:  p = { x:  wx, y: -wy }; break
    case 270: p = { x: -wx, y:  wy }; break
    default:  p = { x:  wy, y:  wx }
  }
  return { x: p.x * mode, y: p.y * mode }
}
