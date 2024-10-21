import { NextResponse } from "next/server";
import Testimonial from "@/models/testimonial";
import { connectToDB } from "@/utils/database";
import getCurrentUser from "@/app/actions/getCurrentUser";

