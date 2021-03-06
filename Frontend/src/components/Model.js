// import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { MD2Loader } from './MD2Loader';
import {
    Mesh,
    TextureLoader,
    MeshPhongMaterial,
    PointLight,
    AmbientLight,
    Box3,
    BoxGeometry,
    MeshNormalMaterial, DoubleSide
} from "three"
import marioTex from "./assets/bobafett/prototype_fett.png"


export default class Model {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null;
        this.box = null;
    }

    load(path) {
        //10000
        // const light = new PointLight( 0xffffff, 5, 10000 );
        // light.position.set( 50, 50, 50 );
        // this.scene.add( light );
        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(marioTex), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))
                this.mesh.position.set(0,0,0);
                this.mesh.castShadow = true;
                this.mesh.receiveShadow = true;
                this.box = new Mesh(new BoxGeometry(20,10,20), new MeshNormalMaterial({
                    color: 0x8888ff,
                    side: DoubleSide,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.5,
                    vertexColors: true
                }))

                this.box.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);
                this.scene.add(this.box)
                this.scene.add(this.mesh);



                console.log(this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}
