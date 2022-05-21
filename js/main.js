/////// Defines instances ///////
//Scene
const scene = new THREE.Scene();
//Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

//Renderer
const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,canvas:document.getElementById('canvas')});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;

// Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('../Textures/NormalMap.png');


/////// create Elements /////
//geometries
const SphereBufferGeometry = new THREE.SphereBufferGeometry(.7,64,64);
// MeshStandardMaterial MeshPhongMaterial
const SphereBufferMaterial = new THREE.MeshStandardMaterial({roughness:0.2,metalness:0.7,normalMap:normalTexture,color:new THREE.Color(0x292929)});
const SphereBuffer = new THREE.Mesh(SphereBufferGeometry,SphereBufferMaterial);
SphereBuffer.position.set(0,0,-2)
SphereBuffer.castShadow = true;
SphereBuffer.receiveShadow= true;



//Lights
const light = new THREE.AmbientLight('#f5f0f1');
const ambientLight = new THREE.PointLight( 0xff0000,1,300);
ambientLight.position.set( 50, 50, 50 );
// Spot Lights 
const SpotLight= new THREE.SpotLight( 0xffffff );
SpotLight.position.set( 5, 5, 20 );
SpotLight.castShadow = true;
// Point Light
const pointLight = new THREE.PointLight(0xffffff,0.1);
pointLight.intensity =0.1;
pointLight.position.set(1,4,4);
const pointLight2 = new THREE.PointLight(0xff0000,2);
pointLight2.position.set(-1.8,1.2,-2);
pointLight2.intensity =2;
const pointLight3 = new THREE.PointLight(0xe1ff,2);
pointLight3.position.set(2.13,-3,-2);
pointLight3.intensity =1;



////// Add elements int the scene //////
scene.add(SphereBuffer);
scene.add(pointLight);
scene.add(pointLight2);
scene.add(pointLight3);


////// window events//////
function resizeScreen(){
    camera.aspect=window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function updateShpere(event){
    SphereBuffer.position.y = window.scrollY * .001;
}

let mouseX=0;
let mouseY=0;
let tarjetX=0;
let tarjetY=0;
let windowHalfX=window.innerWidth /2 ;
let windowHalfY=window.innerHeight /2 ;
function moveMouse(event){
    
    mouseX=event.clientX - windowHalfX;
    mouseY=event.clientY - windowHalfY;
}
window.addEventListener("resize",resizeScreen);
document.addEventListener("mousemove",moveMouse);
window.addEventListener('scroll',updateShpere);

const clock = new THREE.Clock();
/////// Render All /////
function render(){
    requestAnimationFrame(render);
    tarjetX = mouseX *.001;
    tarjetY = mouseY *.001;
    SphereBuffer.rotation.y =.5 * clock.getElapsedTime();

    SphereBuffer.rotation.y +=.5 * (tarjetX - SphereBuffer.rotation.y);
    SphereBuffer.rotation.x +=.5 * (tarjetY - SphereBuffer.rotation.x);
    SphereBuffer.position.z += -1 * (tarjetY - SphereBuffer.rotation.x);

    renderer.render(scene,camera);
}
render();