"use client"

import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import FaceDetection from '@/components/FaceDetection';

export default function Home() {
  

  return (
    <div style={{ padding: '20px' }}>
        <FaceDetection/>
    </div>
  );
}




