// Initialize the Gemini API
const API_KEY = 'Your api key'; // Replace with your actual API key

class MusicGenerator {
    constructor() {
        this.initializeElements();
        this.addEventListeners();
        this.initializeAudioContext();
    }

    initializeElements() {
        this.genreInput = document.getElementById('genre');
        this.instrumentsInput = document.getElementById('instruments');
        this.moodInput = document.getElementById('mood');
        this.generateBtn = document.getElementById('generateBtn');
        this.musicPlayer = document.getElementById('musicPlayer');
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.visualizer = document.getElementById('musicVisualizer');
        this.visualizerCtx = this.visualizer.getContext('2d');
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.themeDropdown = document.querySelector('.theme-dropdown');
        this.themeOptions = document.querySelectorAll('.theme-option');
        this.currentThemeSpan = document.querySelector('.current-theme');
    }

    addEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateMusic());
        this.themeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.changeTheme(btn.dataset.theme));
        });
        this.themeToggleBtn.addEventListener('click', () => this.toggleThemeDropdown());
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.changeTheme(theme);
                this.toggleThemeDropdown();
            });
        });

        
        document.addEventListener('click', (e) => {
            if (!this.themeToggleBtn.contains(e.target) && !this.themeDropdown.contains(e.target)) {
                this.themeDropdown.classList.remove('show');
                this.themeToggleBtn.classList.remove('active');
            }
        });
    }

    initializeAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.isPlaying = false;
        this.currentOscillators = [];
    }

    async generateMusic() {
        try {
            const genre = this.genreInput.value;
            const instruments = this.instrumentsInput.value;
            const mood = this.moodInput.value;

            if (!genre || !instruments || !mood) {
                alert('Please fill in all fields');
                return;
            }

            this.generateBtn.disabled = true;
            this.generateBtn.textContent = 'Generating...';

            
            const prompt = `Generate music parameters with:
                Genre: ${genre}
                Instruments: ${instruments}
                Mood: ${mood}`;

            // Make API call to Gemini
            const response = await this.callGeminiAPI(prompt);
            
            
            const musicParameters = this.parseMusicDescription(response);
            this.generateAudio(musicParameters);

        } catch (error) {
            console.error('Error generating music:', error);
            alert('Error generating music. Please try again.');
        } finally {
            this.generateBtn.disabled = false;
            this.generateBtn.textContent = 'Generate Music';
        }
    }

    async callGeminiAPI(prompt) {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        const response = await fetch(`${url}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    parseMusicDescription(description) {
        const params = {
            tempo: 120,
            key: 'C',
            scale: 'major',
            chordProgression: [],
            duration: 8,
            waveform: 'sine',
            notes: [],
            octave: 4
        };

        
        switch(this.genreInput.value.toLowerCase()) {
            case 'jazz':
                params.chordProgression = ['Dm7', 'G7', 'Cmaj7', 'Fmaj7'];
                params.tempo = 120;
                params.waveform = 'triangle';
                params.scale = 'minor';
                break;
            case 'classical':
                params.chordProgression = ['C', 'G', 'Am', 'F'];
                params.tempo = 90;
                params.waveform = 'sine';
                params.scale = 'major';
                break;
            case 'rock':
                params.chordProgression = ['Em', 'G', 'D', 'A'];
                params.tempo = 140;
                params.waveform = 'square';
                params.scale = 'minor';
                break;
            case 'electronic':
                params.chordProgression = ['Fm', 'Ab', 'Bb', 'Db'];
                params.tempo = 128;
                params.waveform = 'sawtooth';
                params.scale = 'minor';
                break;
            default:
                params.chordProgression = ['C', 'G', 'Am', 'F'];
                params.tempo = 100;
        }

        
        switch(this.moodInput.value.toLowerCase()) {
            case 'happy':
                params.tempo *= 1.1;
                params.octave = 5;
                params.scale = 'major';
                break;
            case 'sad':
                params.tempo *= 0.8;
                params.octave = 3;
                params.scale = 'minor';
                break;
            case 'energetic':
                params.tempo *= 1.3;
                params.octave = 4;
                break;
            case 'melancholic':
                params.tempo *= 0.7;
                params.octave = 3;
                params.scale = 'minor';
                break;
        }

        return params;
    }

    generateAudio(params) {
        this.stopMusic();

        
        this.musicPlayer.innerHTML = `
            <button id="playStopBtn" class="play-button">Play</button>
            <div class="music-controls">
                <label>Volume: <input type="range" id="volumeControl" min="0" max="100" value="50"></label>
                <label>Tempo: <input type="range" id="tempoControl" min="60" max="180" value="${params.tempo}"></label>
            </div>
        `;

        const playStopBtn = document.getElementById('playStopBtn');
        const volumeControl = document.getElementById('volumeControl');
        const tempoControl = document.getElementById('tempoControl');

        playStopBtn.addEventListener('click', () => {
            if (!this.isPlaying) {
                this.playMusic(params);
                playStopBtn.textContent = 'Stop';
            } else {
                this.stopMusic();
                playStopBtn.textContent = 'Play';
            }
        });

        volumeControl.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.setVolume(volume);
        });

        tempoControl.addEventListener('input', (e) => {
            params.tempo = parseInt(e.target.value);
            if (this.isPlaying) {
                this.stopMusic();
                this.playMusic(params);
            }
        });
    }

    playMusic(params) {
        this.isPlaying = true;
        const noteLength = 60 / params.tempo;

        
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        
        const masterGain = this.audioContext.createGain();
        masterGain.connect(this.audioContext.destination);
        masterGain.gain.value = 0.5;

        const reverb = this.createReverb();
        const delay = this.audioContext.createDelay();
        delay.delayTime.value = noteLength / 2;

        const melody = this.generateMelody(params);
        
        melody.forEach((note, index) => {
            const time = this.audioContext.currentTime + (index * noteLength);
            this.playNote(note, time, noteLength, params.waveform, masterGain, reverb, delay);
        });

       
        this.currentOscillators.push({ masterGain, reverb, delay });
    }

    stopMusic() {
        this.isPlaying = false;
        this.currentOscillators.forEach(({ oscillator, gainNode }) => {
            oscillator.stop();
            gainNode.disconnect();
        });
        this.currentOscillators = [];
    }

    setVolume(volume) {
        this.currentOscillators.forEach(({ gainNode }) => {
            gainNode.gain.value = volume;
        });
    }

    createReverb() {
        const convolver = this.audioContext.createConvolver();
        const rate = 44100;
        const length = 2.5 * rate;
        const decay = 2.0;
        const buffer = this.audioContext.createBuffer(2, length, rate);

        for (let channel = 0; channel < 2; channel++) {
            const channelData = buffer.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
            }
        }

        convolver.buffer = buffer;
        return convolver;
    }

    generateMelody(params) {
        const scale = this.getScale(params.key, params.scale);
        const melody = [];
        const numNotes = 16; // Number of notes in melody

        for (let i = 0; i < numNotes; i++) {
            const chordIndex = Math.floor(i / 4) % params.chordProgression.length;
            const chord = params.chordProgression[chordIndex];
            const chordNotes = this.getChordNotes(chord, scale);
            
            // Generate melody note from chord notes and scale
            const noteOptions = [...chordNotes, ...scale];
            const note = noteOptions[Math.floor(Math.random() * noteOptions.length)];
            melody.push(note);
        }

        return melody;
    }

    playNote(note, time, duration, waveform, masterGain, reverb, delay) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = waveform;
        oscillator.frequency.value = this.getNoteFrequency(note);

        // Connect nodes: oscillator -> gain -> effects -> master
        oscillator.connect(gainNode);
        gainNode.connect(reverb);
        gainNode.connect(delay);
        reverb.connect(masterGain);
        delay.connect(masterGain);

        // Apply envelope
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.5, time + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, time + duration - 0.1);

        oscillator.start(time);
        oscillator.stop(time + duration);

        this.currentOscillators.push({ oscillator, gainNode });
    }

    getScale(key, type) {
        const majorIntervals = [0, 2, 4, 5, 7, 9, 11];
        const minorIntervals = [0, 2, 3, 5, 7, 8, 10];
        const intervals = type === 'major' ? majorIntervals : minorIntervals;
        const baseNote = this.getNoteNumber(key);
        
        return intervals.map(interval => this.getNoteFromNumber(baseNote + interval));
    }

    getChordNotes(chord, scale) {
        const root = chord.slice(0, 1);
        const quality = chord.slice(1);
        const rootIndex = scale.indexOf(root);
        
        let intervals;
        switch(quality) {
            case 'maj7':
                intervals = [0, 4, 7, 11];
                break;
            case 'm7':
                intervals = [0, 3, 7, 10];
                break;
            case '7':
                intervals = [0, 4, 7, 10];
                break;
            case 'm':
                intervals = [0, 3, 7];
                break;
            default:
                intervals = [0, 4, 7];
        }
        
        return intervals.map(interval => scale[(rootIndex + interval) % scale.length]);
    }

    getNoteFrequency(note) {
        const noteMap = {
            'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
            'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
            'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
        };
        return noteMap[note] || 440;
    }

    getNoteNumber(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes.indexOf(note);
    }

    getNoteFromNumber(number) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes[((number % 12) + 12) % 12];
    }

    toggleThemeDropdown() {
        this.themeDropdown.classList.toggle('show');
        this.themeToggleBtn.classList.toggle('active');
    }

    changeTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.currentThemeSpan.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        
    
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MusicGenerator();
}); 