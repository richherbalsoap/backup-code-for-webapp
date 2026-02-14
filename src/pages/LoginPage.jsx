
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const panelEl = panelRef.current;
    if (!canvasEl || !panelEl) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const pointer = { x: 0, y: 0, tX: 0, tY: 0 };
    let uniforms;
    const gl = initShader();

    if (!gl) return;

    setupEvents();
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId;
    function render() {
        const currentTime = performance.now();
        pointer.x += (pointer.tX - pointer.x) * .2;
        pointer.y += (pointer.tY - pointer.y) * .2;

        gl.uniform1f(uniforms.u_time, currentTime);
        gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
        gl.uniform1f(uniforms.u_scroll_progress, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationFrameId = requestAnimationFrame(render);
    }
    
    render();

    function initShader() {
      const vsSource = `
        precision mediump float;
        varying vec2 vUv;
        attribute vec2 a_position;
        void main() {
            vUv = .5 * (a_position + 1.);
            gl_Position = vec4(a_position, 0.0, 1.0);
        }`;
      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform float u_scroll_progress;

        vec2 rotate(vec2 uv, float th) {
            return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
        }

        float neuro_shape(vec2 uv, float t, float p) {
            vec2 sine_acc = vec2(0.);
            vec2 res = vec2(0.);
            float scale = 8.;

            for (int j = 0; j < 15; j++) {
                uv = rotate(uv, 1.);
                sine_acc = rotate(sine_acc, 1.);
                vec2 layer = uv * scale + float(j) + sine_acc - t;
                sine_acc += sin(layer) + 2.4 * p;
                res += (.5 + .5 * cos(layer)) / scale;
                scale *= (1.2);
            }
            return res.x + res.y;
        }

        void main() {
            vec2 uv = .5 * vUv;
            uv.x *= u_ratio;

            vec2 pointer = vUv - u_pointer_position;
            pointer.x *= u_ratio;
            float p = clamp(length(pointer), 0., 1.);
            p = .5 * pow(1. - p, 2.);

            float t = .001 * u_time;
            vec3 color = vec3(0.);

            float noise = neuro_shape(uv, t, p);

            noise = 1.2 * pow(noise, 3.);
            noise += pow(noise, 10.);
            noise = max(.0, noise - .5);
            noise *= (1. - length(vUv - .5));

            color = vec3(0.1, 0.2, 0.8);
            color += vec3(0.0, 0.1, 0.4) * sin(3.0 * u_scroll_progress + 1.5);

            color = color * noise;

            gl_FragColor = vec4(color, noise);
        }`;

      const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");
      if (!gl) { console.error("WebGL not supported"); return null; }

      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      
      uniforms = {};
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
          let uniformName = gl.getActiveUniform(program, i).name;
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.useProgram(program);
      const positionLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      return gl;
    }

    function resizeCanvas() {
      canvasEl.width = panelEl.clientWidth * devicePixelRatio;
      canvasEl.height = panelEl.clientHeight * devicePixelRatio;
      if (gl && uniforms.u_ratio) {
        gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
        gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      }
    }

    function setupEvents() {
      const updateMousePosition = (eX, eY) => { pointer.tX = eX; pointer.tY = eY; };
      window.addEventListener("pointermove", e => updateMousePosition(e.clientX, e.clientY));
      window.addEventListener("touchmove", e => updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY));
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - EDULinker</title>
        <meta name="description" content="welcome to EDULinker System dashboard" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#111114] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15 }} />
            <div className="relative p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#FFD93D] drop-shadow-[0_0_20px_rgba(255,217,61,0.5)] mb-2">EDULinker</h1>
                <p className="text-white/60">Login to your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D]/50 transition-all duration-300"
                    placeholder="admin@patanjali.edu"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.targe.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D]/50 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
                >
                  <LogIn size={20} className="mr-2" />
                  Login to Dashboard
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
