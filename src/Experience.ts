import * as THREE from 'three';


export class Experience {
    canvas: HTMLCanvasElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cube: THREE.Mesh;


    constructor(canvas: HTMLCanvasElement) {
        const light = new THREE.DirectionalLight(0xffffff, 3)
        light.position.set(2, 2, 2)

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff6600 })
        this.cube = new THREE.Mesh(geometry, material)

        this.scene.add(this.cube)
        this.scene.add(light)
        this.renderer.setClearColor(0x3366ff)

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })

        this.tick()
    }
    tick() {
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(() => this.tick())
    }
}

